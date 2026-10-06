import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  Image as ImageIcon, 
  Search, 
  Check, 
  Trash2, 
  FolderOpen,
  Folder,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Eye,
  Layers,
  CheckCircle2
} from 'lucide-react';

export function MediaLibraryModal({
  isOpen,
  onClose,
  onSaveGallery,
  currentImages = [],
  properties = [],
  activePropertyRef = '815'
}) {
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'library' | 'upload'
  const [selectedFolder, setSelectedFolder] = useState(activePropertyRef ? `Propiedad Ref ${activePropertyRef}` : 'Todas');
  const [uploadFolder, setUploadFolder] = useState(activePropertyRef ? `Propiedad Ref ${activePropertyRef}` : 'General');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Gallery images selected and their ordered sequence
  const [selectedGallery, setSelectedGallery] = useState([...currentImages]);
  const [mediaItems, setMediaItems] = useState([]);
  const fileInputRef = useRef(null);

  // Folders: 'Todas las Imágenes', one folder for each property, plus general
  const folders = React.useMemo(() => {
    const list = [
      { id: 'Todas', name: 'Todas las Imágenes' },
      ...properties.map(p => ({
        id: `Propiedad Ref ${p.reference}`,
        name: `Ref ${p.reference} - ${p.title.slice(0, 22)}...`
      })),
      { id: 'General', name: 'Imágenes Generales' }
    ];
    return list;
  }, [properties]);

  // Load existing media items
  useEffect(() => {
    if (isOpen) {
      setSelectedGallery([...currentImages]);
      const storedPool = localStorage.getItem('wave_media_library_pool_v2');
      let pool = storedPool ? JSON.parse(storedPool) : [];

      if (pool.length === 0) {
        // Build seed pool from properties
        const initial = [];
        properties.forEach(p => {
          (p.images || []).forEach((img, idx) => {
            initial.push({
              id: `med_${p.reference}_${idx}`,
              name: `Wave_${p.reference}_foto_${idx + 1}.webp`,
              url: img,
              folder: `Propiedad Ref ${p.reference}`,
              sizeBytes: Math.floor(180000 + Math.random() * 80000),
              createdAt: new Date().toISOString()
            });
          });
        });
        pool = initial;
        localStorage.setItem('wave_media_library_pool_v2', JSON.stringify(pool));
      }

      setMediaItems(pool);
      if (activePropertyRef) {
        setSelectedFolder(`Propiedad Ref ${activePropertyRef}`);
        setUploadFolder(`Propiedad Ref ${activePropertyRef}`);
      }
    }
  }, [isOpen, currentImages, activePropertyRef, properties]);

  // Handle image upload with WebP compression
  const handleFileUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const webpDataUrl = canvas.toDataURL('image/webp', 0.85);

          const newItem = {
            id: 'med_' + Date.now(),
            name: file.name.replace(/\.[^/.]+$/, "") + '_optimized.webp',
            url: webpDataUrl,
            folder: uploadFolder,
            sizeBytes: Math.round(webpDataUrl.length * 0.75),
            createdAt: new Date().toISOString()
          };

          const updatedPool = [newItem, ...mediaItems];
          setMediaItems(updatedPool);
          localStorage.setItem('wave_media_library_pool_v2', JSON.stringify(updatedPool));

          // Also auto-add to gallery if uploading for current property
          if (!selectedGallery.includes(newItem.url)) {
            setSelectedGallery(prev => [...prev, newItem.url]);
          }

          setSelectedFolder(uploadFolder);
          setActiveTab('gallery');
          setIsProcessing(false);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error optimizing image:', err);
      setIsProcessing(false);
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesFolder = selectedFolder === 'Todas' || item.folder === selectedFolder;
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const toggleSelectImageForGallery = (url) => {
    if (selectedGallery.includes(url)) {
      setSelectedGallery(selectedGallery.filter(u => u !== url));
    } else {
      setSelectedGallery([...selectedGallery, url]);
    }
  };

  const moveOrder = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= selectedGallery.length) return;
    const copy = [...selectedGallery];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    setSelectedGallery(copy);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[88vh] max-h-[820px] flex flex-col overflow-hidden text-slate-900">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Gestión de Galería & Carpetas de Propiedades
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                ORGANIZACIÓN POR PROPIEDAD · ORDENAMIENTO DE GALERÍA · WEBP RETINA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'gallery' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Galería Elegida ({selectedGallery.length})
              </button>
              <button
                onClick={() => setActiveTab('library')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'library' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Explorar Carpetas ({mediaItems.length})
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'upload' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Subir & Optimizar WebP
              </button>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Galería Seleccionada y Reordenamiento */}
        {activeTab === 'gallery' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Fotos activas de la propiedad ({selectedGallery.length} imágenes)
                </h4>
                <p className="text-xs text-slate-500">
                  La primera imagen será la portada visible en la web. Usá las flechas para reordenar la secuencia.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('library')}
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
              >
                + Elegir más desde Carpetas
              </button>
            </div>

            {selectedGallery.length === 0 ? (
              <div className="flex-1 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-white space-y-3">
                <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
                <div className="text-sm font-bold text-slate-700">Sin imágenes en la galería</div>
                <p className="text-xs text-slate-400 max-w-sm">
                  Explorá la carpeta correspondiente a esta propiedad o subí fotos nuevas optimizadas en WebP.
                </p>
                <button
                  onClick={() => setActiveTab('library')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Explorar Carpetas
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
                {selectedGallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border-2 border-slate-200 p-2 shadow-2xs space-y-2 relative group hover:border-blue-400 transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100">
                      <img src={imgUrl} alt="Foto" className="w-full h-full object-cover" />
                      
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-xs">
                          PORTADA
                        </span>
                      )}

                      <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>

                      <button
                        onClick={() => setPreviewImage(imgUrl)}
                        className="absolute top-2 right-2 p-1 rounded-lg bg-white/90 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                        title="Ver Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveOrder(idx, -1)}
                          className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                          title="Mover antes"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === selectedGallery.length - 1}
                          onClick={() => moveOrder(idx, 1)}
                          className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                          title="Mover después"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setSelectedGallery(selectedGallery.filter((_, i) => i !== idx))}
                        className="text-[10px] font-bold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-md"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Save gallery footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between mt-2">
              <span className="text-xs text-slate-500 font-semibold">
                {selectedGallery.length} imágenes ordenadas para la propiedad
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSaveGallery(selectedGallery);
                    onClose();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs"
                >
                  Confirmar y Guardar Galería
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Explorar Carpetas */}
        {activeTab === 'library' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Carpetas */}
            <div className="w-64 border-r border-slate-200 bg-slate-50 p-4 flex flex-col gap-1 overflow-y-auto shrink-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Carpetas de Propiedades
              </div>
              {folders.map(f => {
                const count = f.id === 'Todas' ? mediaItems.length : mediaItems.filter(m => m.folder === f.id).length;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFolder(f.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedFolder === f.id
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Folder className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{f.name}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      selectedFolder === f.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Media Items in folder */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar imagen en carpeta..."
                    className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {filteredMedia.length} fotos en esta carpeta
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {filteredMedia.map(item => {
                  const isSelected = selectedGallery.includes(item.url);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelectImageForGallery(item.url)}
                      className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer group transition-all h-36 bg-slate-100 ${
                        isSelected ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      
                      <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {item.folder}
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-white/95 p-1 rounded-lg text-[9px] font-bold text-slate-700 truncate shadow-xs">
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  {selectedGallery.length} fotos seleccionadas en la galería
                </span>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Volver a Galería & Ordenar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Subir & Optimizar WebP */}
        {activeTab === 'upload' && (
          <div className="flex-1 p-8 flex flex-col items-center justify-center max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h4 className="text-base font-extrabold text-slate-900">Pipeline de Optimización Multimedia Wave</h4>
              <p className="text-xs text-slate-500">
                Al subir cualquier imagen (JPG o PNG), el motor la redimensiona a escala Retina y la comprime en formato moderno <strong>WebP (85% calidad)</strong> y la asigna a la carpeta correspondiente.
              </p>
            </div>

            <div className="w-full space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500">Carpeta Destino:</label>
              <select
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value)}
                className="w-full text-xs font-semibold border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800"
              >
                {folders.filter(f => f.id !== 'Todas').map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-10 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 transition-all space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div>
                <span className="text-sm font-bold text-slate-800 block">Hacé clic o arrastrá tu imagen aquí</span>
                <span className="text-xs text-slate-400 mt-1 block">Formatos: JPG, PNG o WebP original</span>
              </div>

              {isProcessing && (
                <div className="text-xs font-bold text-blue-600 animate-pulse flex items-center justify-center gap-1.5 pt-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Optimizando a WebP (85% calidad)...</span>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {/* Modal de Preview de Imagen */}
        {previewImage && (
          <div className="fixed inset-0 z-70 bg-black/80 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[85vh] bg-black rounded-2xl overflow-hidden">
              <img src={previewImage} alt="Preview" className="w-full h-full object-contain max-h-[80vh]" />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold hover:bg-white/40"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
