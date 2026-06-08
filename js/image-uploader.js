/**
 * PT TechNova - Reusable Image Uploader with Drag & Drop
 *
 * Usage:
 *   createImageUploader({
 *     containerId : 'myUploader',   // ID of the wrapper div
 *     inputId     : 'myUrlInput',   // ID of hidden/text input that stores the URL
 *     previewId   : 'myPreview',    // (optional) ID of <img> for live preview
 *     label       : 'Foto Produk',  // Label text
 *     currentUrl  : 'https://...'   // Prefill existing image URL
 *   });
 */

function createImageUploader({ containerId, inputId, previewId, label = 'Gambar', currentUrl = '' }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Build inner HTML
    container.innerHTML = `
        <div class="img-uploader" id="zone_${containerId}">
            <div class="img-uploader__dropzone" id="dz_${containerId}">
                <div class="img-uploader__preview-wrap">
                    <img id="prev_${containerId}" src="${currentUrl || ''}"
                         style="${currentUrl ? '' : 'display:none'}"
                         alt="Preview" class="img-uploader__preview-img">
                    <div class="img-uploader__placeholder" id="ph_${containerId}"
                         style="${currentUrl ? 'display:none' : ''}">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Drag &amp; drop foto ke sini</p>
                        <span>atau</span>
                        <button type="button" class="btn btn-sm btn-secondary" id="pickBtn_${containerId}">
                            <i class="fas fa-folder-open"></i> Pilih File
                        </button>
                        <p class="img-uploader__hint">JPG, PNG, GIF, WEBP, SVG · Maks 10 MB</p>
                    </div>
                </div>

                <!-- overlay when dragging -->
                <div class="img-uploader__overlay" id="ov_${containerId}">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Lepaskan untuk upload</p>
                </div>
            </div>

            <!-- actions shown when image is loaded -->
            <div class="img-uploader__actions" id="act_${containerId}"
                 style="${currentUrl ? '' : 'display:none'}">
                <button type="button" class="btn btn-sm btn-secondary" id="chgBtn_${containerId}">
                    <i class="fas fa-sync-alt"></i> Ganti Foto
                </button>
                <button type="button" class="btn btn-sm btn-danger" id="rmBtn_${containerId}">
                    <i class="fas fa-trash"></i> Hapus Foto
                </button>
            </div>

            <!-- URL input (also accepts paste of external URL) -->
            <div class="img-uploader__url-row">
                <input type="url" id="${inputId}"
                       class="form-control img-uploader__url-input"
                       placeholder="Atau paste URL gambar…"
                       value="${currentUrl || ''}">
            </div>

            <!-- hidden file input -->
            <input type="file" id="file_${containerId}"
                   accept="image/*" style="display:none">

            <!-- progress -->
            <div class="img-uploader__progress" id="prog_${containerId}" style="display:none">
                <div class="img-uploader__progress-bar">
                    <div class="img-uploader__progress-fill" id="fill_${containerId}"></div>
                </div>
                <span id="progTxt_${containerId}">Mengupload…</span>
            </div>
        </div>
    `;

    // ---- References ----
    const zone      = document.getElementById(`dz_${containerId}`);
    const fileInput = document.getElementById(`file_${containerId}`);
    const urlInput  = document.getElementById(inputId);
    const previewEl = document.getElementById(`prev_${containerId}`);
    const placeholder = document.getElementById(`ph_${containerId}`);
    const overlay   = document.getElementById(`ov_${containerId}`);
    const actions   = document.getElementById(`act_${containerId}`);
    const pickBtn   = document.getElementById(`pickBtn_${containerId}`);
    const chgBtn    = document.getElementById(`chgBtn_${containerId}`);
    const rmBtn     = document.getElementById(`rmBtn_${containerId}`);
    const progWrap  = document.getElementById(`prog_${containerId}`);
    const progFill  = document.getElementById(`fill_${containerId}`);
    const progTxt   = document.getElementById(`progTxt_${containerId}`);

    // Also wire optional external <img> preview
    const extPreview = previewId ? document.getElementById(previewId) : null;

    // ---- Helpers ----
    function showImage(url) {
        previewEl.src = url;
        previewEl.style.display = 'block';
        placeholder.style.display = 'none';
        actions.style.display = 'flex';
        urlInput.value = url;
        if (extPreview) extPreview.src = url;
    }

    function clearImage() {
        previewEl.src = '';
        previewEl.style.display = 'none';
        placeholder.style.display = 'flex';
        actions.style.display = 'none';
        urlInput.value = '';
        fileInput.value = '';
        if (extPreview) extPreview.src = '';
    }

    function setProgress(pct, text) {
        progWrap.style.display = 'block';
        progFill.style.width = pct + '%';
        progTxt.textContent = text;
    }

    function hideProgress() {
        setTimeout(() => { progWrap.style.display = 'none'; progFill.style.width = '0%'; }, 800);
    }

    // ---- Upload ----
    async function uploadFile(file) {
        if (!file) return;

        // Client-side validation
        const maxMB = 10;
        if (file.size > maxMB * 1024 * 1024) {
            if (window.showToast) showToast(`File terlalu besar. Maks ${maxMB}MB.`, 'error');
            return;
        }
        const allowedTypes = ['image/jpeg','image/png','image/gif','image/webp','image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            if (window.showToast) showToast('Format tidak didukung. Gunakan JPG, PNG, GIF, WEBP, SVG.', 'error');
            return;
        }

        // Show local preview immediately
        const reader = new FileReader();
        reader.onload = e => showImage(e.target.result);
        reader.readAsDataURL(file);

        // Upload
        setProgress(30, `Mengupload ${file.name}…`);

        try {
            // Use Supabase Storage
            const result = await uploadToSupabase(file, 'media');
            
            setProgress(100, 'Selesai!');
            hideProgress();

            if (!result.success) throw new Error(result.error || 'Upload gagal');

            // Replace blob preview with real server URL
            showImage(result.url);
            if (window.showToast) showToast('Foto berhasil diupload!', 'success');

        } catch (err) {
            hideProgress();
            if (window.showToast) showToast('Upload gagal: ' + err.message, 'error');
            console.error('Upload error:', err);
        }
    }

    // ---- Events ----

    // Pick file button
    pickBtn.addEventListener('click', () => fileInput.click());
    chgBtn.addEventListener('click', () => fileInput.click());

    // File selected via picker
    fileInput.addEventListener('change', e => {
        if (e.target.files[0]) uploadFile(e.target.files[0]);
    });

    // Remove image
    rmBtn.addEventListener('click', clearImage);

    // URL input manual paste / type
    urlInput.addEventListener('change', () => {
        const val = urlInput.value.trim();
        if (val) {
            showImage(val);
        } else {
            clearImage();
        }
    });

    // Drag events
    zone.addEventListener('dragenter', e => { e.preventDefault(); overlay.style.display = 'flex'; });
    zone.addEventListener('dragover',  e => { e.preventDefault(); overlay.style.display = 'flex'; });
    zone.addEventListener('dragleave', e => {
        // Only hide if leaving the zone entirely
        if (!zone.contains(e.relatedTarget)) overlay.style.display = 'none';
    });
    zone.addEventListener('drop', e => {
        e.preventDefault();
        overlay.style.display = 'none';
        const file = e.dataTransfer.files[0];
        if (file) uploadFile(file);
    });

    // Click on zone (but not on buttons)
    zone.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        if (!previewEl.style.display || previewEl.style.display === 'none') {
            fileInput.click();
        }
    });
}

// ---- CSS (injected once) ----
(function injectUploaderCSS() {
    if (document.getElementById('img-uploader-style')) return;
    const style = document.createElement('style');
    style.id = 'img-uploader-style';
    style.textContent = `
        .img-uploader {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .img-uploader__dropzone {
            position: relative;
            border: 2px dashed #cbd5e1;
            border-radius: 0.75rem;
            background: #f8fafc;
            min-height: 200px;
            cursor: pointer;
            transition: border-color 0.2s, background 0.2s;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .img-uploader__dropzone:hover {
            border-color: #3b82f6;
            background: #eff6ff;
        }

        .img-uploader__preview-wrap {
            width: 100%;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .img-uploader__preview-img {
            max-width: 100%;
            max-height: 300px;
            border-radius: 0.5rem;
            object-fit: contain;
            padding: 0.5rem;
        }

        .img-uploader__placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            color: #64748b;
            padding: 2rem;
            text-align: center;
        }

        .img-uploader__placeholder i {
            font-size: 2.5rem;
            color: #94a3b8;
        }

        .img-uploader__placeholder p {
            margin: 0;
            font-weight: 500;
            color: #475569;
        }

        .img-uploader__placeholder span {
            font-size: 0.8rem;
            color: #94a3b8;
        }

        .img-uploader__hint {
            font-size: 0.75rem !important;
            color: #94a3b8 !important;
            font-weight: normal !important;
        }

        .img-uploader__overlay {
            display: none;
            position: absolute;
            inset: 0;
            background: rgba(59, 130, 246, 0.85);
            color: white;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            border-radius: 0.6rem;
            font-size: 1.1rem;
            font-weight: 600;
            pointer-events: none;
            z-index: 10;
        }

        .img-uploader__overlay i {
            font-size: 2.5rem;
        }

        .img-uploader__actions {
            display: flex;
            gap: 0.75rem;
        }

        .img-uploader__url-row {
            display: flex;
            gap: 0.5rem;
        }

        .img-uploader__url-input {
            font-size: 0.8125rem;
        }

        .img-uploader__progress {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .img-uploader__progress-bar {
            height: 6px;
            background: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
        }

        .img-uploader__progress-fill {
            height: 100%;
            background: #3b82f6;
            transition: width 0.3s ease;
            border-radius: 3px;
        }

        .img-uploader__progress span {
            font-size: 0.75rem;
            color: #64748b;
        }
    `;
    document.head.appendChild(style);
})();

window.createImageUploader = createImageUploader;
