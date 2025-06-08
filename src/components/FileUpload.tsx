"use client"

import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  maxFileSize?: number; // MB cinsinden
  maxTotalSize?: number; // MB cinsinden toplam boyut
  acceptedTypes?: string[];
  maxFiles?: number;
}

export default function FileUpload({ 
  onFilesChange, 
  maxFileSize = 50, 
  maxTotalSize = 500,
  acceptedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'video/mp4', 'video/avi', 'video/mov', 'video/wmv',
    'text/plain'
  ],
  maxFiles = 8
}: FileUploadProps) {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosya türü kontrolü
  const isValidFileType = (file: File) => {
    return acceptedTypes.includes(file.type);
  };

  // Dosya boyutu kontrolü
  const isValidFileSize = (file: File) => {
    return file.size <= maxFileSize * 1024 * 1024;
  };

  // Toplam dosya boyutu kontrolü
  const getTotalFileSize = (files: UploadedFile[]) => {
    return files.reduce((total, uploadedFile) => total + uploadedFile.file.size, 0);
  };

  const isValidTotalSize = (newFiles: File[]) => {
    const currentTotalSize = getTotalFileSize(uploadedFiles);
    const newFilesSize = newFiles.reduce((total, file) => total + file.size, 0);
    return (currentTotalSize + newFilesSize) <= maxTotalSize * 1024 * 1024;
  };

  // Dosya önizleme oluştur
  const createPreview = useCallback((file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  }, []);

  // Dosya yükleme simülasyonu
  const simulateUpload = async (uploadedFile: UploadedFile) => {
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
      
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, progress: (i / steps) * 100 }
            : f
        )
      );
    }

    setUploadedFiles(prev => 
      prev.map(f => 
        f.id === uploadedFile.id 
          ? { ...f, status: 'completed' }
          : f
      )
    );
  };

  // Dosya işleme
  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    // Maksimum dosya sayısı kontrolü
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      alert(t('maxFilesError', { max: maxFiles }));
      return;
    }

    // Toplam boyut kontrolü
    if (!isValidTotalSize(fileArray)) {
      alert(t('maxTotalSizeError', { size: maxTotalSize }));
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    fileArray.forEach(file => {
      if (!isValidFileType(file)) {
        invalidFiles.push(`${file.name}: ${t('unsupportedType')}`);
      } else if (!isValidFileSize(file)) {
        invalidFiles.push(`${file.name}: ${t('fileSizeError', { size: maxFileSize })}`);
      } else {
        validFiles.push(file);
      }
    });

    // Hata mesajları göster
    if (invalidFiles.length > 0) {
      alert(t('uploadErrors') + '\n' + invalidFiles.join('\n'));
    }

    // Geçerli dosyaları işle
    for (const file of validFiles) {
      const id = Math.random().toString(36).substr(2, 9);
      const preview = await createPreview(file);
      
      const uploadedFile: UploadedFile = {
        id,
        file,
        progress: 0,
        status: 'uploading',
        preview
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);
      
      // Yükleme simülasyonunu başlat
      simulateUpload(uploadedFile);
    }

      // Parent komponente dosyaları bildir
    const allFiles = [...uploadedFiles.map(f => f.file), ...validFiles];
    if (onFilesChange) {
      onFilesChange(allFiles);
    }
  };

  // Dosya silme
  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter(f => f.id !== id);
      if (onFilesChange) {
        onFilesChange(newFiles.map(f => f.file));
      }
      return newFiles;
    });
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  // Dosya seçme
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Dosya boyutunu formatla
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Dosya ikonunu al
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('word')) return '📝';
    if (file.type.includes('excel') || file.type.includes('sheet')) return '📊';
    if (file.type.startsWith('video/')) return '🎥';
    if (file.type.includes('text')) return '📃';
    return '📎';
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl">📁</div>
          <div>
            <p className="text-lg font-medium text-gray-800">
              {t('dragDropText')}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {t('supportedFormats')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t('maxFileInfo').replace('{size}', maxFileSize.toString()).replace('{count}', maxFiles.toString())}
            </p>
            <p className="text-xs text-gray-500">
              {t('maxTotalSizeInfo').replace('{totalSize}', maxTotalSize.toString())}
            </p>
            <p className="text-xs text-orange-600 mt-1">
              {t('planLimitWarning')}
            </p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-800">
            {t('uploadedFiles')} ({uploadedFiles.length}/{maxFiles})
          </h4>
          
          {uploadedFiles.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded"
            >
              {/* File Icon/Preview */}
              <div className="flex-shrink-0">
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt="preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded text-2xl">
                    {getFileIcon(uploadedFile.file)}
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(uploadedFile.file.size)}
                </p>
                
                {/* Progress Bar */}
                {uploadedFile.status === 'uploading' && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadedFile.progress}%` }}
                    ></div>
                  </div>
                )}
                
                {/* Status */}
                <div className="mt-1">
                  {uploadedFile.status === 'uploading' && (
                    <span className="text-xs text-blue-600">
                      {t('uploading', { percent: Math.round(uploadedFile.progress) })}
                    </span>
                  )}
                  {uploadedFile.status === 'completed' && (
                    <span className="text-xs text-green-600 flex items-center">
                      ✅ {t('uploaded')}
                    </span>
                  )}
                  {uploadedFile.status === 'error' && (
                    <span className="text-xs text-red-600">
                      ❌ {t('uploadError')}
                    </span>
                  )}
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(uploadedFile.id);
                }}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                title={t('removeFile')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 