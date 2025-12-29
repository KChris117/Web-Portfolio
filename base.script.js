document.addEventListener('DOMContentLoaded', () => {
    console.log("Base page loaded.");

    // --- KONSTANTA ---
    const DEFAULT_MAX_CHARACTERS = 3;
    const DORMITORY_MAX_CHARACTERS = 5;
    const CHIBI_MIN_SEPARATION_PERCENT = 10; // Jarak minimal antar chibi dalam persen
    const CHIBI_MIN_MOVE_DELAY_MS = 4000; // Minimal delay sebelum gerakan berikutnya
    const CHIBI_MAX_MOVE_DELAY_MS = 8000; // Maksimal delay sebelum gerakan berikutnya
    const CHIBI_MIN_MOVE_DISTANCE_PERCENT = 20;
    const CHIBI_MAX_MOVE_DISTANCE_PERCENT = 50;

    // Data untuk tipe-tipe fasilitas
    const CLICK_HERE_IMAGE_PATH = 'assets/other/clickhere.png';
    // Data Proyek
    const MY_PROJECTS = [
        {
            id: 'project1',
            name: 'Project 1: E-Commerce Website - Online Cosmetics',
            description: 'My first project, creating a cosmetic sales website, here for the first time for me to learn programming, such as HTML, CSS, and PHP. For this project, I use Bootstrap CSS as the design of this website and MySQL as the database. In this project, I am the group leader with the role of Frontend. I also have contributions in the backend and UI/UX design. In short, we developed this cosmetics sales website with the aim of facilitating the sale of cosmetics during the previous Covid-19 pandemic.',
            images: [
                'assets/projects/project1/picture1.png',
                'assets/projects/project1/picture2.png',
                'assets/projects/project1/picture3.png'
            ]
        },
        {
            id: 'project2',
            name: 'Project 2: E-Commerce Website - 1st Symphony',
            description: 'My second project, we created a concert ticket sales website, here we used Laravel (PHP Framework), Tailwind (CSS Framework) and MySQL as the database. In this project, I was a member of the group with the role of Frontend, but my full contribution was in UI/UX design using figma. In short, we designed this application with the aim of helping buyers who are interested in music and are interested in attending concert events provided by related parties by providing a website that sells tickets in the form of e-tickets according to ongoing concert events and upcoming concerts.',
            images: [
                'assets/projects/project2/picture1.png',
                'assets/projects/project2/picture2.png',
                'assets/projects/project2/picture3.png',
                'assets/projects/project2/picture4.png',
                'assets/projects/project2/picture5.png',
            ]
        },
        {
            id: 'project3',
            name: 'Project 3: Mobile Application Development - GuideME App',
            description: 'My third project, we have started to create a mobile (android) tour guide application, here we use Flutter (Dart Framework) and Firebase as the database. In this project, I am part of a group with Frontend and Backend roles. And I also have a contribution in the UI/UX Design section using figma. In short, we developed this application with the aim of introducing tourists to the destinations in Batam City. This application facilitates recommendations for tourist destinations, destination searches based on categories, ticket purchase menus, event and activity schedules, transportation guides and interactive maps, related practical information, and galleries.',
            images: [
                'assets/projects/project3/picture1.jpg',
                'assets/projects/project3/picture2.jpg',
                'assets/projects/project3/picture3.jpg',
                'assets/projects/project3/picture4.jpg',
                'assets/projects/project3/picture5.jpg',
            ]
        },
        {
            id: 'project4',
            name: 'Project 4: Mobile Game Development - Stock Rising',
            description: 'My fourth project... was actually an unexpected project from college. Here, we used C# as the programming language, Firebase as the database, Unity 3D as the game engine, and Photon PUN 2 as the framework for the multiplayer mode server. In this project, I played both the backend and frontend roles, and my contributions included game scripting, multiplayer UI design, and synchronizing all data, animations, and player movements to other devices. The main goal of this project is to improve financial literacy among young people through interactive learning, providing safe and educational investment simulations without financial risk, and combining elements of entertainment and education to make the learning process enjoyable.',
            images: [
                'assets/projects/project4/picture1.jpg',
                'assets/projects/project4/picture2.jpg',
                'assets/projects/project4/picture3.jpg',
                'assets/projects/project4/picture4.jpg',
                'assets/projects/project4/picture5.jpg',
            ]
        },
        {
            id: 'project5',
            name: 'Project 5: Inventory Management Website in PT. Infineon Technologies Batam',
            description: 'My fifth project, this one from my internship, was again using C# as the programming language, CSS for the website design, and MySQL as the database. In this project, I worked alone as a full-stack programmer, and the task was to create a website that could be used to monitor inventory activities, such as incoming and outgoing stock, request management, and more. This project aimed to build a C# and MySQL-based inventory web application with FIFO logic implementation for more efficient stock management, equipped with approval and user management modules to improve operational control, as well as real-time reporting and PDF features to support auditing and accurate decision-making.',
            images: [
                'assets/projects/project5/picture1.png',
                'assets/projects/project5/picture2.png',
                'assets/projects/project5/picture3.png',
                'assets/projects/project5/picture4.png',
            ]
        }
    ];

    const facilityTypes = [
        { id: 'control_center', name: 'CONTROL CENTER', description: 'The heart of your base operations.', size: 'large', maxCharacters: 2 }, // Menambahkan Control Center dengan maxCharacters 2
        { id: 'factory', name: 'FACTORY', description: 'Produces Battle Records, Originium Shards, and Gold Bars.', size: 'small', maxCharacters: 3 },
        { id: 'power_plant', name: 'POWER PLANT', description: 'Increases the Drone recovery rate.', size: 'small', maxCharacters: 3 },
        { id: 'trading_post', name: 'TRADING POST', description: 'Fulfills Originium orders to gain Lungmen Dollars.', size: 'small', maxCharacters: 3 },
        { id: 'workshop', name: 'WORKSHOP', description: 'Processes materials into more advanced items.', size: 'medium', maxCharacters: 3 },
        { id: 'reception_room', name: 'RECEPTION ROOM', description: 'Gathers Clues and hosts support Operators.', size: 'large', maxCharacters: 2 },
        { id: 'dormitory', name: 'DORMITORY', description: 'Recovers the Morale of assigned Operators.', size: 'large', maxCharacters: 5 }
    ];

    // Data untuk karakter yang bisa ditambahkan
    const characterData = [
        { id: 'amiya', name: 'Amiya' },
        { id: 'exusiai', name: 'Exusiai' },
        { id: 'ambriel', name : 'Ambriel' },
        { id: 'april', name : 'April' },
        { id: 'chen', name: 'Ch\'en' }
    ];

    // Data untuk tema background ruangan
    const backgroundThemes = [
        { id: 'default', name: 'Default Theme', preview: "assets/interiors/default.png" },
        { id: 'factory', name: 'Factory Theme', preview: "assets/interiors/factory.png" },
        { id: 'tradingpost', name: 'Trading Post', preview: "assets/interiors/tradingpost.png" },
        { id: 'trainingroom', name: 'Training Room', preview: "assets/interiors/trainingroom.png" },
        { id: 'receptionroom', name: 'Reception Room', preview: "assets/interiors/receptionroom.png" },
        { id: 'office', name: 'Office Theme', preview: "assets/interiors/office.png" },
        { id: 'powerplant', name: 'Power Plant', preview: "assets/interiors/powerplant.png" },
    ];

    // Data untuk item dekorasi
    const decorItems = [
        { id: 'note_default', name: 'Sticky Note', image: 'assets/items/note.png' },
        { id: 'photo1', name: 'Photo Frame 1', image: 'assets/items/photoframe.png' },
        { id: 'photo2', name: 'Photo Frame 2', image: 'assets/items/photoframe2.png' },
        { id: 'photo3', name: 'Photo Frame 3', image: 'assets/items/photoframe3.png' },
        { id: 'photo4', name: 'Photo Frame 4', image: 'assets/items/photoframe4.png' },
        { id: 'photo5', name: 'Photo Frame 5', image: 'assets/items/photoframe5.png' },
        { id: 'photo6', name: 'Photo Frame 6', image: 'assets/items/photoframe6.png' },
        // Tambahkan bingkai foto baru di sini
    ];

    // Data untuk gambar kustom yang bisa dipilih pengguna
    const myBackgroundImages = [
        { id: 'photo1', name: 'Photo 1', src: 'assets/myphoto/photo1.jpg' },
        { id: 'photo2', name: 'Photo 2', src: 'assets/myphoto/photo2.jpg' },
        { id: 'photo3', name: 'Photo 3', src: 'assets/myphoto/photo3.jpg' },
        { id: 'photo4', name: 'Photo 4', src: 'assets/myphoto/photo4.jpg' },
        { id: 'photo5', name: 'Photo 5', src: 'assets/myphoto/photo5.jpg' },
        { id: 'photo6', name: 'Photo 6', src: 'assets/myphoto/photo6.jpg' },
        { id: 'photo7', name: 'Photo 7', src: 'assets/myphoto/photo7.jpg' },
        { id: 'photo8', name: 'Photo 8', src: 'assets/myphoto/photo8.jpg' },
        { id: 'photo9', name: 'Photo 9', src: 'assets/myphoto/photo9.jpg' },
        { id: 'photo10', name: 'Photo 10', src: 'assets/myphoto/photo10.jpg' },
        // Tambahkan lebih banyak gambar di sini jika diperlukan
    ];

    // Ambil elemen-elemen yang dibutuhkan dari DOM
    const addRoomBtn = document.getElementById('add-room-btn');
    const modalOverlay = document.getElementById('add-room-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const roomChoiceContainer = document.getElementById('room-choice-container');
    const modalHeaderTitle = document.querySelector('.modal-header h2');
    const modalBody = document.querySelector('.modal-body');
    const firstFloor = document.getElementById('floor-1');
    const baseLayout = document.querySelector('.base-layout');
    const roomDetailView = document.getElementById('room-detail-view');
    const detailRoomName = document.getElementById('detail-room-name');
    const detailBackButton = document.getElementById('detail-back-btn');
    const detailRoomContent = document.getElementById('detail-room-content');
    const detailHeader = document.querySelector('.room-detail-header');
    const controlCenterElement = document.querySelector('.control-center'); // Ambil elemen Control Center
    const addItemBtn = document.getElementById('add-item-btn');
    const editPositionBtn = document.getElementById('edit-position-btn'); // Tombol baru
    const savePositionsBtn = document.getElementById('save-positions-btn'); // Tombol baru
    const resetCcBtn = document.getElementById('reset-cc-btn'); // Tombol reset CC
    const saveDecorBtn = document.getElementById('save-decor-btn');
    // Elemen untuk zoomed picture overlay
    const zoomedPictureOverlay = document.getElementById('zoomed-picture-overlay');
    // Elemen untuk zoomed note overlay
    const zoomedNoteOverlay = document.getElementById('zoomed-note-overlay');
    const zoomedNoteTextContent = document.getElementById('zoomed-note-text-content');
    const zoomedNoteEditBtn = document.getElementById('zoomed-note-edit-btn');
    const zoomedNoteDeleteBtn = document.getElementById('zoomed-note-delete-btn');
    // Elemen untuk modal detail proyek
    const projectDetailModalOverlay = document.getElementById('project-detail-modal-overlay');
    const projectDetailTitle = document.getElementById('project-detail-title');
    const projectDetailCloseBtn = document.getElementById('project-detail-close-btn');
    const projectSlideshowImg = document.getElementById('project-slideshow-img');
    const projectDetailDescription = document.getElementById('project-detail-description');
    const slideshowDotsContainer = document.getElementById('slideshow-dots');

    let originalModalTitle = modalHeaderTitle.textContent;
    let activeRoomElement = null; // Menyimpan elemen ruangan yang sedang aktif/dilihat
    let charactersInView = []; // Menyimpan karakter yang sedang ditampilkan untuk reset animasi
    let isRoomEditMode = false; // State untuk mode edit posisi ruangan
    let draggedRoom = null; // Menyimpan elemen ruangan yang sedang di-drag

    let currentProjectSlideshowIndex = 0; // Untuk slideshow proyek
    // Variabel untuk mengontrol pergerakan chibi
    let activeChibis = []; // Sekarang menjadi array untuk menampung banyak chibi


    // --- FUNGSI HELPER MODAL ---
    const showModalWithContent = (title, contentGenerator) => {
        modalHeaderTitle.textContent = title;
        modalBody.innerHTML = '';
        const content = contentGenerator();
        modalBody.appendChild(content);
        openModal();
        return content; // Kembalikan elemen konten untuk event listener tambahan
    };

    // Fungsi untuk mengisi modal dengan pilihan ruangan
    const populateRoomChoices = () => {
        roomChoiceContainer.innerHTML = ''; // Kosongkan kontainer terlebih dahulu
        facilityTypes.forEach(type => {
            const card = document.createElement('div');
            card.classList.add('room-choice-card');
            card.dataset.type = type.id; // Simpan tipe ruangan di data-attribute

            card.innerHTML = `
                <h3>${type.name}</h3>
                <p>${type.description}</p>
            `;
            roomChoiceContainer.appendChild(card);
        });
        // Pastikan kontainer pilihan terlihat
        roomChoiceContainer.style.display = 'grid';
    };

    // Fungsi untuk membuka modal
    const openModal = () => {
        modalOverlay.classList.remove('hidden');
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        modalOverlay.classList.add('hidden');
        // Reset modal ke tampilan awal saat ditutup
        setTimeout(() => {
            modalHeaderTitle.textContent = originalModalTitle;
            modalBody.innerHTML = ''; // Hapus form
            modalBody.appendChild(roomChoiceContainer); // Tambahkan lagi pilihan
            populateRoomChoices();
        }, 300); // Tunggu animasi transisi selesai
    };

    // Tambahkan event listener untuk tombol
    addRoomBtn.addEventListener('click', openModal);
    modalCloseBtn.addEventListener('click', closeModal);

    // Menutup modal jika pengguna mengklik di luar area modal
    modalOverlay.addEventListener('click', (event) => {
        // Cek apakah yang diklik adalah overlay itu sendiri, bukan anaknya (modal-content)
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Fungsi untuk menampilkan form edit nama
    const showEditForm = (roomElement) => {
        const currentName = roomElement.dataset.name;
        modalHeaderTitle.textContent = `EDIT FACILITY`;
        
        // Kosongkan modal body dan sembunyikan pilihan ruangan
        modalBody.innerHTML = '';
        roomChoiceContainer.style.display = 'none';

        // Buat elemen form edit
        const form = document.createElement('div');
        form.innerHTML = `
            <div class="form-group">
                <label for="room-name-edit-input">Facility Name</label>
                <input type="text" id="room-name-edit-input" class="modal-input" value="${currentName}">
            </div>
            <button class="build-btn" id="save-changes-btn">SAVE CHANGES</button>
        `;
        modalBody.appendChild(form);
        openModal(); // Buka modal

        // Fokuskan ke input field
        document.getElementById('room-name-edit-input').focus();

        const saveButton = document.getElementById('save-changes-btn');

        // Event listener untuk tombol save
        saveButton.addEventListener('click', () => {
            const newName = document.getElementById('room-name-edit-input').value;
            roomElement.querySelector('span').textContent = newName.toUpperCase();
            roomElement.dataset.name = newName;
            saveBaseLayout(); // Simpan perubahan
            closeModal();
        }, { once: true }); // Listener akan otomatis dihapus setelah sekali jalan
    };

    // Fungsi untuk menampilkan form penamaan ruangan baru
    const showNamingForm = (roomType) => {
        modalHeaderTitle.textContent = `BUILD: ${roomType.name}`;
        
        // Kosongkan modal body dan sembunyikan pilihan ruangan
        modalBody.innerHTML = '';
        roomChoiceContainer.style.display = 'none';

        // Buat elemen form
        const form = document.createElement('div');
        form.innerHTML = `
            <a href="#" class="modal-back-link" id="modal-back-link">← Back to choices</a>
            <div class="form-group">
                <label for="room-name-input">Facility Name</label>
                <input type="text" id="room-name-input" class="modal-input" value="${roomType.name} 1">
            </div>
            <button class="build-btn" id="build-room-btn">BUILD</button>
        `;
        modalBody.appendChild(form);

        // Fokuskan ke input field
        const nameInput = document.getElementById('room-name-input');
        nameInput.focus();
        nameInput.select();

        // Event listener untuk tombol build
        document.getElementById('build-room-btn').addEventListener('click', () => { // Gunakan { once: true }
            const newName = nameInput.value.trim();
            if (newName) {
                createRoomElement(roomType, newName, true); // Buat elemen dan simpan
                closeModal();
            } else {
                alert('Please provide a name for the facility.');
            }
        }, { once: true });

        // Event listener untuk link kembali
        document.getElementById('modal-back-link').addEventListener('click', (e) => {
            e.preventDefault();
            modalHeaderTitle.textContent = originalModalTitle;
            modalBody.innerHTML = '';
            modalBody.appendChild(roomChoiceContainer);
            populateRoomChoices();
        });
    };

    // Fungsi untuk menampilkan modal pemilihan karakter
    const showCharacterSelectionModal = () => {
        if (!activeRoomElement) return;
    
        const assignedCharacters = JSON.parse(activeRoomElement.dataset.characters || '[]');
        const roomTypeData = facilityTypes.find(type => type.id === activeRoomElement.dataset.type);
        const maxAllowedCharacters = roomTypeData ? roomTypeData.maxCharacters : DEFAULT_MAX_CHARACTERS;
    
        if (assignedCharacters.length >= maxAllowedCharacters) {
            alert(`Maximum number of operators (${maxAllowedCharacters}) reached for this facility.`);
            return;
        }
    
        const listContainer = showModalWithContent('ASSIGN OPERATOR', () => {
            const container = document.createElement('div');
            container.classList.add('character-choice-container');
    
            characterData.forEach(char => {
                if (!assignedCharacters.includes(char.id)) {
                    const charItem = document.createElement('div');
                    charItem.classList.add('character-choice-item');
                    charItem.textContent = char.name;
                    charItem.dataset.charId = char.id;
                    container.appendChild(charItem);
                }
            });
            return container;
        });
    
        listContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('character-choice-item')) {
                const charId = e.target.dataset.charId;
                assignCharacterToRoom(charId);
                closeModal();
            }
        });
    };
    
    // Fungsi untuk menampilkan modal pemilihan tema background
    const showThemeSelectionModal = () => {
        if (!activeRoomElement) return;
    
        const themeContainer = showModalWithContent('CHANGE THEME', () => {
            const container = document.createElement('div');
            container.classList.add('room-choice-container'); // Pakai style yang sama
            backgroundThemes.forEach(theme => {
                const themeCard = document.createElement('div');
                themeCard.className = 'room-choice-card';
                themeCard.dataset.themeId = theme.id;
                themeCard.innerHTML = `<h3>${theme.name}</h3><img src="${theme.preview}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px; margin-top: 5px;">`;
                container.appendChild(themeCard);
            });
            return container;
        });
    
        themeContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.room-choice-card');
            if (card) {
                const themeId = card.dataset.themeId;
                activeRoomElement.dataset.background = themeId;
                roomDetailView.style.backgroundImage = `url('assets/interiors/${themeId}.png')`;
                saveBaseLayout();
                closeModal();
            }
        });
    };
    
    // Fungsi untuk menampilkan modal pemilihan item dekorasi
    const showDecorItemSelectionModal = () => {
        if (!activeRoomElement || activeRoomElement.dataset.type !== 'control_center') return;
    
        const itemContainer = showModalWithContent('ADD DECORATION', () => {
            const container = document.createElement('div');
            container.classList.add('room-choice-container');
            decorItems.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.className = 'room-choice-card';
                itemCard.dataset.itemId = item.id;
                itemCard.innerHTML = `<h3>${item.name}</h3><img src="${item.image}" style="width: 80px; height: auto; margin-top: 10px;">`;
                container.appendChild(itemCard);
            });
            return container;
        });
    
        itemContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.room-choice-card');
            if (card) {
                const itemId = card.dataset.itemId;
                const itemInfo = decorItems.find(it => it.id === itemId);
                if (itemInfo) {
                    createDecorItemElement(itemInfo);
                }
                closeModal();
            }
        });
    };
    // Fungsi untuk menampilkan modal aksi Note (Add/Edit Text, Delete)
    const showNoteActionModal = (noteElement) => {
        if (!activeRoomElement || !activeRoomElement.classList.contains('control-center')) return;

        const hasText = noteElement.dataset.textContent && noteElement.dataset.textContent.trim() !== '';

        // Tampilkan teks di overlay yang di-zoom
        zoomedNoteTextContent.textContent = noteElement.dataset.textContent || 'Click "EDIT TEXT" to add content.';
        zoomedNoteTextContent.style.whiteSpace = 'pre-wrap';
        zoomedNoteOverlay.classList.add('visible');

        // Atur teks tombol edit
        zoomedNoteEditBtn.textContent = hasText ? 'EDIT TEXT' : 'ADD TEXT';

        // Event listener untuk tombol edit
        zoomedNoteEditBtn.onclick = () => {
            // Tutup overlay zoom note, lalu buka modal editor teks
            zoomedNoteOverlay.classList.remove('visible');
            showTextEditorModal(noteElement);
        };

        // Event listener untuk tombol delete
        zoomedNoteDeleteBtn.onclick = () => {
            if (confirm('Are you sure you want to delete this item?')) {
                noteElement.remove();
                saveDecorations(); // Simpan perubahan setelah item dihapus
                zoomedNoteOverlay.classList.remove('visible'); // Tutup overlay
            }
        };
    };

    // Event listener untuk menutup zoomed note overlay
    document.getElementById('zoomed-note-close').addEventListener('click', () => {
        zoomedNoteOverlay.classList.remove('visible');
    });

    // Fungsi untuk menampilkan modal editor teks untuk Note (ini akan dipanggil dari zoomedNoteOverlay)
    const showTextEditorModal = (noteElement) => {
        modalHeaderTitle.textContent = 'EDIT NOTE TEXT';
        modalBody.innerHTML = ''; // Kosongkan body
    const currentText = noteElement.dataset.textContent || '';
        const form = document.createElement('div');
        form.innerHTML = `
            <div class="form-group">
                <label for="note-text-input">Your Note:</label>
                <textarea id="note-text-input" class="modal-input" rows="8" 
                          placeholder="Write something about yourself or your portfolio...">${currentText}</textarea>
            </div>
            <button class="build-btn" id="save-note-text-btn">SAVE TEXT</button>
        `;
        modalBody.appendChild(form);

        const noteTextInput = document.getElementById('note-text-input');
        const saveNoteTextBtn = document.getElementById('save-note-text-btn');

        // Fokuskan ke textarea
        noteTextInput.focus();

        saveNoteTextBtn.addEventListener('click', () => {
            noteElement.dataset.textContent = noteTextInput.value;
            saveDecorations(); // Simpan perubahan teks
            saveDecorBtn.classList.add('visible'); // Tampilkan tombol save utama
            closeModal();
        });

        openModal();
    };

    // Fungsi untuk menampilkan modal pemilihan gambar kustom untuk photo frame
    const showImageSelectionModal = (photoFrameElement) => {
        modalHeaderTitle.textContent = 'CHOOSE A PICTURE';
        modalBody.innerHTML = ''; // Kosongkan body

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('room-choice-container'); // Pakai style yang sama

        myBackgroundImages.forEach(imgData => {
            const imgCard = document.createElement('div');
            imgCard.className = 'room-choice-card';
            imgCard.dataset.imageSrc = imgData.src;
            imgCard.innerHTML = `
                <h3>${imgData.name}</h3>
                <img src="${imgData.src}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 4px; margin-top: 5px;">
            `;
            imageContainer.appendChild(imgCard);
        });

        modalBody.appendChild(imageContainer);
        openModal(); // Pastikan modal terbuka (atau tetap terbuka)

        // Event listener untuk memilih gambar
        imageContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.room-choice-card');
            if (card) {
                const selectedSrc = card.dataset.imageSrc;
                // Jangan ubah src dari photo frame, cukup simpan data gambar yang dipilih.
                // photoFrameElement.src = selectedSrc; // <-- BARIS INI DIHAPUS/DINONAKTIFKAN
                photoFrameElement.dataset.selectedImageSrc = selectedSrc;
                // Tampilkan tombol save karena ada perubahan
                saveDecorBtn.classList.add('visible');
                saveDecorations(); // Langsung simpan agar data-attribute ter-update
                
                closeModal();
            }
        });
    };

    // Fungsi helper untuk membuat tombol delete item
    const createDeleteItemButton = (itemElement) => {
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('build-btn');
        deleteBtn.textContent = 'DELETE ITEM';
        deleteBtn.style.backgroundColor = '#c0392b'; // Merah
        deleteBtn.style.borderColor = '#e74c3c';
        deleteBtn.style.marginTop = '10px';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this item?')) {
                itemElement.remove();
                saveDecorations(); // Simpan perubahan setelah item dihapus
                closeModal();
            }
        });
        return deleteBtn;
    };

    // Fungsi untuk menampilkan modal editor ukuran
    const showSizeEditorModal = (itemElement) => {
        modalHeaderTitle.textContent = 'EDIT ITEM SIZE';
        modalBody.innerHTML = ''; // Kosongkan body

        const currentWidth = itemElement.offsetWidth;
        const minWidth = 40;
        const maxWidth = 400;

        const form = document.createElement('div');
        form.innerHTML = `
            <div class="form-group">
                <label for="size-slider">Size: <span id="size-value">${currentWidth}px</span></label>
                <input type="range" id="size-slider" class="modal-input" 
                       min="${minWidth}" max="${maxWidth}" value="${currentWidth}" 
                       style="padding: 0; margin-top: 10px;">
            </div>
        `;
        modalBody.appendChild(form);

        const sizeSlider = document.getElementById('size-slider');
        const sizeValueSpan = document.getElementById('size-value');

        // Event listener untuk slider
        sizeSlider.addEventListener('input', () => {
            const newWidth = sizeSlider.value;
            itemElement.style.width = `${newWidth}px`;
            sizeValueSpan.textContent = `${newWidth}px`;
            
            // Tampilkan tombol save karena ada perubahan
            saveDecorBtn.classList.add('visible');
        });

        // Tidak perlu tombol save di modal ini, perubahan disimpan saat
        // pengguna menekan tombol "SAVE ITEMS" utama.
        // Modal ini bisa ditutup dengan tombol close atau klik di luar.

        openModal();
    };

    // Fungsi untuk menampilkan modal aksi item (Choose/Edit, Move, Delete)
    const showPhotoFrameActionModal = (photoFrameElement) => {
        if (!activeRoomElement || !activeRoomElement.classList.contains('control-center')) return;

        const hasImage = photoFrameElement.dataset.selectedImageSrc;
        modalHeaderTitle.textContent = 'PHOTO FRAME ACTIONS';
        modalBody.innerHTML = ''; // Kosongkan body

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('room-choice-container'); // Re-use style
        actionContainer.style.gridTemplateColumns = '1fr'; // Satu kolom

        // Pratinjau gambar saat ini
        if (hasImage) {
            const imgPreview = document.createElement('img');
            imgPreview.src = hasImage;
            imgPreview.classList.add('photo-frame-preview-img'); // Tambahkan kelas CSS baru
            actionContainer.appendChild(imgPreview);
        } else {
            const placeholder = document.createElement('p');
            placeholder.textContent = 'No picture selected.';
            placeholder.style.marginBottom = '15px';
            actionContainer.appendChild(placeholder);
        }

        // Tombol Choose/Edit Picture
        const chooseEditBtn = document.createElement('button');
        chooseEditBtn.classList.add('build-btn'); // Re-use style
        chooseEditBtn.textContent = hasImage ? 'EDIT PICTURE' : 'CHOOSE PICTURE';
        chooseEditBtn.addEventListener('click', () => {
            showImageSelectionModal(photoFrameElement); // Langsung buka modal pemilihan gambar
        });
        actionContainer.appendChild(chooseEditBtn);

        // Tombol Edit Size dihapus sesuai permintaan
        // const editSizeBtn = document.createElement('button');
        // editSizeBtn.classList.add('build-btn');
        // editSizeBtn.textContent = 'EDIT SIZE';
        // editSizeBtn.style.marginTop = '10px';
        // editSizeBtn.addEventListener('click', () => {
        //     showSizeEditorModal(photoFrameElement);
        // });
        // actionContainer.appendChild(editSizeBtn);

        const deleteBtn = createDeleteItemButton(photoFrameElement);
        actionContainer.appendChild(deleteBtn);

        modalBody.appendChild(actionContainer);
        openModal();

        // Event listener untuk menutup modal saat tombol delete di klik
        deleteBtn.addEventListener('click', () => {
            // Jika item berhasil dihapus, modal aksi juga harus ditutup
            if (!photoFrameElement.parentNode) { // Cek apakah elemen sudah tidak ada di DOM
                closeModal();
            }
        }, { once: true });
    };

    // Event listener untuk menutup zoomed picture overlay
    // Dihapus karena overlay tidak digunakan lagi

    // Fungsi untuk menugaskan karakter ke ruangan
    const assignCharacterToRoom = (charId) => {
        if (!activeRoomElement) return;

        const roomTypeData = facilityTypes.find(type => type.id === activeRoomElement.dataset.type);
        if (!roomTypeData) {
            console.error("Room type data not found for active room:", activeRoomElement.dataset.type);
            return;
        }
        const maxAllowedCharacters = roomTypeData ? roomTypeData.maxCharacters : DEFAULT_MAX_CHARACTERS;

        let assignedCharacters = JSON.parse(activeRoomElement.dataset.characters || '[]');
        if (assignedCharacters.length < maxAllowedCharacters && !assignedCharacters.includes(charId)) {
            assignedCharacters.push(charId); // Tambahkan karakter
            activeRoomElement.dataset.characters = JSON.stringify(assignedCharacters);
            saveBaseLayout();
            startChibiMovement(assignedCharacters); // Restart pergerakan dengan karakter baru
            updateAssignedCharactersUI(assignedCharacters); // Perbarui UI header
        }
    };

    // Fungsi untuk menghapus karakter dari ruangan
    const removeCharacterFromRoom = (charId) => {
        if (!activeRoomElement) return;
        let assignedCharacters = JSON.parse(activeRoomElement.dataset.characters || '[]');
        const updatedCharacters = assignedCharacters.filter(id => id !== charId);
        activeRoomElement.dataset.characters = JSON.stringify(updatedCharacters);
        saveBaseLayout();
        startChibiMovement(updatedCharacters); // Restart pergerakan
        updateAssignedCharactersUI(updatedCharacters); // Perbarui UI
    };

    // Event delegation untuk semua ruangan (termasuk Control Center)
    // Menggantikan event listener di firstFloor agar Control Center juga bisa diklik
    baseLayout.addEventListener('click', (event) => {
        // Jika dalam mode edit posisi ruangan, jangan lakukan aksi klik normal
        if (isRoomEditMode) {
            return;
        }
        const roomElement = event.target.closest('.facility-room');
        if (!roomElement) return; // Keluar jika klik tidak di dalam .facility-room

        // Cek apakah tombol hapus yang diklik
        if (event.target.classList.contains('delete-btn')) {
            // Control Center tidak bisa dihapus
            if (roomElement.id === 'control-center') return;

            // Minta konfirmasi sebelum menghapus
            if (confirm(`Are you sure you want to delete "${roomElement.dataset.name}"?`)) {
                roomElement.remove(); // Hapus elemen dari DOM
                saveBaseLayout(); // Simpan perubahan
            }
        }
        // Cek apakah tombol edit yang diklik
        else if (event.target.classList.contains('edit-btn')) {
            // Control Center tidak bisa diedit namanya (tidak ada tombol edit)
            if (roomElement.id === 'control-center') return;
            showEditForm(roomElement);
        } else {
            // Jika bukan tombol aksi yang diklik, berarti seluruh area ruangan yang diklik
            activeRoomElement = roomElement; // Set ruangan yang aktif
            zoomIntoRoom(roomElement);
        }
    });

    // Fungsi untuk memulai pergerakan chibi
    const startChibiMovement = (characterIds = []) => {
        stopChibiMovement(); // Hentikan semua pergerakan sebelumnya

        characterIds.forEach(charId => {
            const charInfo = characterData.find(c => c.id === charId);
            if (!charInfo) return;

            const chibiElement = document.createElement('img');
            chibiElement.classList.add('chibi-character');
            // Posisi awal acak agar tidak tumpuk
            chibiElement.style.left = `${Math.random() * 50 + 25}%`; 
            chibiElement.src = `assets/${charInfo.id}/${charInfo.id}idleright.gif`;
            chibiElement.dataset.chibiId = charInfo.id; // Beri ID untuk identifikasi

            const moveStep = () => {
                // Tambahkan jeda "berpikir" yang acak sebelum bergerak
                const thinkingDelay = Math.random() * 1000; // 0 sampai 1 detik
                
                setTimeout(() => {
                    const currentPos = parseFloat(chibiElement.style.left || '50%');

                    // --- LOGIKA BARU UNTUK PERGERAKAN YANG LEBIH BAIK ---
                    // 1. Tentukan jarak perjalanan acak dalam rentang yang wajar
                    const travelDistance = Math.random() * (CHIBI_MAX_MOVE_DISTANCE_PERCENT - CHIBI_MIN_MOVE_DISTANCE_PERCENT) + CHIBI_MIN_MOVE_DISTANCE_PERCENT; 
                    // 2. Tentukan arah acak (-1 untuk kiri, 1 untuk kanan)
                    let direction = Math.random() < 0.5 ? -1 : 1; // 50% chance to go left or right
                    // 3. Hitung posisi target awal
                    let targetPos = currentPos + (travelDistance * direction);

                    // 4. Cek batas-batas area (10% dan 90%)
                    const minBoundary = 10;
                    const maxBoundary = 90;

                    // Jika target keluar batas, coba balik arahnya
                    if (targetPos < minBoundary || targetPos > maxBoundary) {
                        direction *= -1; // Balik arah
                        targetPos = currentPos + (travelDistance * direction);
                        // Jika masih keluar batas (terjebak di pojok), paksa ke batas terdekat
                        targetPos = Math.max(minBoundary, Math.min(maxBoundary, targetPos));
                    }

                    // --- LOGIKA PENGHINDARAN TUMPUK ---
                    const MIN_SEPARATION = CHIBI_MIN_SEPARATION_PERCENT; // Jarak minimal antar chibi
                    activeChibis.forEach(otherChibi => {
                        // Jangan cek dengan diri sendiri
                        if (otherChibi.element.dataset.chibiId === chibiElement.dataset.chibiId) return;

                        const otherPos = parseFloat(otherChibi.element.style.left);
                        const distanceToOther = Math.abs(targetPos - otherPos);

                        if (distanceToOther < MIN_SEPARATION) {
                            // Jika terlalu dekat, dorong target menjauh dari karakter lain
                            const pushDirection = (targetPos > otherPos) ? 1 : -1;
                            targetPos = otherPos + (MIN_SEPARATION * pushDirection);
                        }
                    });

                    // Hitung jarak untuk menentukan durasi. Semakin jauh, semakin lama.
                    const distance = Math.abs(targetPos - currentPos); // Jarak sebenarnya setelah penyesuaian
                    // Durasi dasar 2-5 detik, disesuaikan dengan jarak.
                    const moveDuration = (distance / 100) * 3 + 2; // (misal: 80% jarak -> 0.8*3+2 = 4.4 detik)
                    
                    chibiElement.style.transition = `left ${moveDuration.toFixed(2)}s linear`;

                    let idleGifSrc;

                    if (targetPos < currentPos) {
                        chibiElement.src = `assets/${charInfo.id}/${charInfo.id}walkleft.gif`;
                        idleGifSrc = `assets/${charInfo.id}/${charInfo.id}idleleft.gif`;
                    } else {
                        chibiElement.src = `assets/${charInfo.id}/${charInfo.id}walkright.gif`;
                        idleGifSrc = `assets/${charInfo.id}/${charInfo.id}idleright.gif`;
                    }

                    chibiElement.style.left = `${targetPos}%`;

                    const onTransitionEnd = () => {
                        chibiElement.src = idleGifSrc;
                    };
                    chibiElement.addEventListener('transitionend', onTransitionEnd, { once: true });
                }, thinkingDelay);
            };

            // Perlebar rentang waktu istirahat (idle)
            const intervalId = setInterval(moveStep, Math.random() * (CHIBI_MAX_MOVE_DELAY_MS - CHIBI_MIN_MOVE_DELAY_MS) + CHIBI_MIN_MOVE_DELAY_MS);
            setTimeout(moveStep, Math.random() * 2000 + 500); // Gerakan pertama dengan delay acak

            // Tambahkan elemen ke DOM setelah semua setup selesai
            detailRoomContent.appendChild(chibiElement);
            // Simpan referensi ke array activeChibis
            activeChibis.push({ element: chibiElement, interval: intervalId, id: charInfo.id });
        });
    };

    // Fungsi untuk menghentikan dan menghapus chibi
    const stopChibiMovement = () => {
        activeChibis.forEach(chibi => {
            clearInterval(chibi.interval);
            chibi.element.remove();
        });
        activeChibis = []; // Kosongkan array
    };

    // Fungsi untuk memperbarui UI karakter yang ditugaskan di header
    const updateAssignedCharactersUI = (characterIds = []) => {
        // Hapus UI lama
        detailHeader.querySelectorAll('.assigned-character, .add-character-btn').forEach(el => el.remove());

        const roomTypeData = facilityTypes.find(type => type.id === activeRoomElement.dataset.type);
        const maxAllowedCharacters = roomTypeData ? roomTypeData.maxCharacters : DEFAULT_MAX_CHARACTERS;

        // Buat kontainer untuk avatar
        const assignedContainer = document.createElement('div');
        assignedContainer.className = 'assigned-characters-container';

        characterIds.forEach(id => {
            const charInfo = characterData.find(c => c.id === id);
            if (charInfo) {
                const charDiv = document.createElement('div');
                charDiv.className = 'assigned-character';
                charDiv.textContent = charInfo.name;
                charDiv.title = `Click to remove ${charInfo.name}`;
                charDiv.dataset.charId = id;
                charDiv.addEventListener('click', () => removeCharacterFromRoom(id));
                assignedContainer.appendChild(charDiv);
            }
        });

        // Tambahkan tombol '+' jika slot masih ada
        if (characterIds.length < maxAllowedCharacters) {
            const addBtn = document.createElement('button');
            addBtn.className = 'add-character-btn';
            addBtn.textContent = '+';
            addBtn.title = 'Assign Operator';
            addBtn.addEventListener('click', showCharacterSelectionModal);
            assignedContainer.appendChild(addBtn);
        }

        detailHeader.appendChild(assignedContainer);
    };

    // Fungsi untuk zoom ke dalam ruangan
    const zoomIntoRoom = (roomElement) => {
        const roomRect = roomElement.getBoundingClientRect();
        const roomType = roomElement.dataset.type;

        // 1. Atur posisi & ukuran awal detail view agar sama dengan ruangan yg diklik
        roomDetailView.style.top = `${roomRect.top}px`;
        roomDetailView.style.left = `${roomRect.left}px`;
        roomDetailView.style.width = `${roomRect.width}px`;
        roomDetailView.style.height = `${roomRect.height}px`;

        // Atur konten detail view
        detailRoomName.textContent = roomElement.dataset.name.toUpperCase();
        // --- PERUBAHAN LOGIKA BACKGROUND ---
        // Gunakan background dari dataset, atau fallback ke tipe ruangan
        const backgroundId = roomElement.dataset.background || roomType;
        roomDetailView.style.backgroundImage = `url('assets/interiors/${backgroundId}.png'), url('assets/interiors/default.png')`;

        // 2. Tampilkan detail view dan sembunyikan base layout
        roomDetailView.classList.add('visible');
        baseLayout.classList.add('zoomed-in');

        // 3. Animasikan detail view agar memenuhi layar
        setTimeout(() => {
            // --- PERUBAHAN DI SINI ---
            // Tidak lagi full screen, tapi 80% dari viewport dan terpusat.
            const targetWidth = '80vw';
            const targetHeight = '80vh';
            roomDetailView.style.top = '10vh'; // (100vh - 80vh) / 2
            roomDetailView.style.left = '10vw'; // (100vw - 80vw) / 2
            roomDetailView.style.width = targetWidth;
            roomDetailView.style.height = targetHeight;
            roomDetailView.style.borderRadius = '8px'; // Beri sedikit radius agar tidak kaku
        }, 10); // Timeout kecil agar transisi CSS terpicu

        // Simpan referensi ruangan yang diklik untuk animasi kembali
        roomDetailView.dataset.originRect = JSON.stringify(roomRect);

        // Ambil data karakter dari dataset dan mulai gerakan
        const assignedCharacters = JSON.parse(roomElement.dataset.characters || '[]');
        charactersInView = assignedCharacters; // Simpan karakter untuk reset animasi
        updateAssignedCharactersUI(assignedCharacters);

        // Tampilkan tombol "Add Item" hanya untuk Control Center
        if (roomType === 'control_center') {
            addItemBtn.style.display = 'block';
            resetCcBtn.style.display = 'inline-block'; // Tampilkan tombol reset
            // Muat dan tampilkan item dekorasi yang sudah ada
            const decorations = JSON.parse(roomElement.dataset.decorations || '[]');
            decorations.forEach(decorData => createDecorItemElement(decorData, false));
        } else {
            addItemBtn.style.display = 'none';
        }

        // Mulai pergerakan chibi setelah animasi zoom selesai
        setTimeout(() => startChibiMovement(assignedCharacters), 500);

        // Tambahkan elemen interaktif untuk Workshop
        if (roomElement.dataset.type === 'workshop') {
            const clickHereImg = document.createElement('img');
            clickHereImg.src = CLICK_HERE_IMAGE_PATH;
            clickHereImg.id = 'workshop-interactive-area';
            clickHereImg.classList.add('workshop-interactive-area'); // Tambahkan kelas untuk styling
            clickHereImg.alt = 'Click here for projects';
            detailRoomContent.appendChild(clickHereImg);
            clickHereImg.addEventListener('click', showProjectListModal);
        }
    };

    // Fungsi untuk menampilkan daftar proyek di modal
    const showProjectListModal = () => {
        modalHeaderTitle.textContent = 'MY PROJECTS';
        modalBody.innerHTML = ''; // Kosongkan body

        const projectListContainer = document.createElement('div');
        projectListContainer.classList.add('project-card-container'); // Gunakan kelas baru untuk styling

        MY_PROJECTS.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.textContent = project.name;
            projectCard.dataset.projectId = project.id;
            projectListContainer.appendChild(projectCard);
        });

        modalBody.appendChild(projectListContainer);
        openModal();

        // Placeholder untuk penanganan klik proyek di masa depan
        projectListContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const projectId = card.dataset.projectId;
                // Tutup modal saat ini sebelum membuka modal detail proyek
                closeModal();
                showProjectDetailModal(projectId);
            }
        });
    };

    // Fungsi untuk menampilkan modal detail proyek
    const showProjectDetailModal = (projectId) => {
        const project = MY_PROJECTS.find(p => p.id === projectId);
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }

        projectDetailTitle.textContent = project.name;
        projectDetailDescription.textContent = project.description;

        // Inisialisasi slideshow
        currentProjectSlideshowIndex = 0;
        updateProjectSlideshow(project);

        projectDetailModalOverlay.classList.add('visible');
    };

    // Fungsi untuk memperbarui slideshow proyek
    const updateProjectSlideshow = (project) => {
        if (!project || !project.images || project.images.length === 0) {
            projectSlideshowImg.src = ''; // Kosongkan jika tidak ada gambar
            slideshowDotsContainer.innerHTML = '';
            return;
        }

        // Fade out gambar saat ini, ganti src, lalu fade in gambar baru
        projectSlideshowImg.style.opacity = '0';
        setTimeout(() => {
            projectSlideshowImg.src = project.images[currentProjectSlideshowIndex];
            projectSlideshowImg.style.opacity = '1';
        }, 150); // Durasi ini harus lebih pendek dari transisi CSS (0.3s = 300ms)

        // Update dots
        slideshowDotsContainer.innerHTML = '';
        project.images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slideshow-dot');
            if (index === currentProjectSlideshowIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentProjectSlideshowIndex = index;
                updateProjectSlideshow(project);
            });
            slideshowDotsContainer.appendChild(dot);
        });
    };

    // Event listener untuk tombol navigasi slideshow
    document.getElementById('slideshow-prev-btn').addEventListener('click', () => {
        const project = MY_PROJECTS.find(p => p.name === projectDetailTitle.textContent); // Ambil proyek aktif
        if (project && project.images.length > 0) {
            currentProjectSlideshowIndex = (currentProjectSlideshowIndex - 1 + project.images.length) % project.images.length;
            updateProjectSlideshow(project);
        }
    });
    document.getElementById('slideshow-next-btn').addEventListener('click', () => {
        const project = MY_PROJECTS.find(p => p.name === projectDetailTitle.textContent); // Ambil proyek aktif
        if (project && project.images.length > 0) {
            currentProjectSlideshowIndex = (currentProjectSlideshowIndex + 1) % project.images.length;
            updateProjectSlideshow(project);
        }
    });

    // Event listener untuk menutup modal detail proyek
    projectDetailCloseBtn.addEventListener('click', () => {
        projectDetailModalOverlay.classList.remove('visible');
    });
    projectDetailModalOverlay.addEventListener('click', (event) => {
        if (event.target === projectDetailModalOverlay) {
            projectDetailModalOverlay.classList.remove('visible');
        }
    });

    // Fungsi untuk zoom keluar dari ruangan
    const zoomOutFromRoom = () => {
        const originRect = JSON.parse(roomDetailView.dataset.originRect);

        // 1. Kembalikan detail view ke posisi & ukuran semula
        roomDetailView.style.top = `${originRect.top}px`;
        roomDetailView.style.left = `${originRect.left}px`;
        roomDetailView.style.width = `${originRect.width}px`;
        roomDetailView.style.height = `${originRect.height}px`;
        roomDetailView.style.borderRadius = '4px'; // Kembalikan ke radius awal

        // 2. Tampilkan kembali base layout
        baseLayout.classList.remove('zoomed-in');

        // 3. Sembunyikan detail view setelah animasi selesai
        setTimeout(() => {
            roomDetailView.classList.remove('visible');
            stopChibiMovement(); // Hentikan dan hapus chibi
            detailRoomContent.innerHTML = ''; // Hapus semua item dekorasi juga
            zoomedNoteOverlay.classList.remove('visible'); // Pastikan overlay note juga tertutup
            saveDecorBtn.classList.remove('visible'); // Sembunyikan tombol save saat keluar
            charactersInView = []; // Kosongkan daftar karakter saat keluar
            activeRoomElement = null; // Reset ruangan aktif
        }, 500); // Sesuaikan dengan durasi transisi CSS
    };

    // Event listener untuk tombol kembali di detail view
    detailBackButton.addEventListener('click', zoomOutFromRoom);

    // Event listener untuk tombol ganti tema
    document.getElementById('change-theme-btn').addEventListener('click', showThemeSelectionModal);
    // Event listener untuk tombol tambah item
    addItemBtn.addEventListener('click', showDecorItemSelectionModal);
    // Event listener untuk tombol save dekorasi
    saveDecorBtn.addEventListener('click', () => {
        saveDecorations();
        saveDecorBtn.classList.remove('visible'); // Sembunyikan setelah save
        console.log('Item positions saved!');
    });

    // Event listener untuk tombol reset Control Center
    resetCcBtn.addEventListener('click', () => {
        if (!activeRoomElement || activeRoomElement.dataset.type !== 'control_center') return;

        if (confirm('Are you sure you want to reset all items and assigned operators in the Control Center? This action cannot be undone.')) {
            // Reset karakter
            activeRoomElement.dataset.characters = '[]';
            stopChibiMovement(); // Hentikan dan hapus chibi
            updateAssignedCharactersUI([]); // Perbarui UI karakter

            // Reset dekorasi
            activeRoomElement.dataset.decorations = '[]';
            detailRoomContent.innerHTML = ''; // Hapus semua elemen dekorasi dari DOM
            saveDecorBtn.classList.remove('visible'); // Sembunyikan tombol save
            saveBaseLayout(); // Simpan perubahan ke localStorage
            console.log('Control Center reset successfully!');
        }
    });

    // Fungsi untuk membuat elemen ruangan baru di halaman
    const createRoomElement = (roomType, roomName, shouldSave = false) => {
        const roomDiv = document.createElement('div');
        // Tambahkan kelas umum, kelas ukuran, dan kelas spesifik tipe
        roomDiv.classList.add('facility-room', `room-size-${roomType.size}`, `${roomType.id}-room`);
        roomDiv.dataset.type = roomType.id;
        roomDiv.dataset.name = roomName; // Simpan nama juga di dataset
        roomDiv.dataset.characters = roomType.characters || '[]'; // Simpan data karakter
        roomDiv.dataset.background = roomType.background || roomType.id; // Simpan background, fallback ke ID tipe
        // Tambahkan dataset untuk dekorasi, hanya untuk control center
        if (roomType.id === 'control_center') {
            roomDiv.dataset.decorations = roomType.decorations || '[]';
        }

        // Buat konten ruangan (nama dan tombol aksi)
        roomDiv.innerHTML = `
            <span>${roomName.toUpperCase()}</span>
            <div class="room-actions">
                <button class="room-action-btn edit-btn" title="Edit Name">✎</button>
                <button class="room-action-btn delete-btn" title="Delete Room">×</button>
            </div>
        `;

        // Tambahkan ruangan baru ke dalam kontainer lantai pertama
        firstFloor.appendChild(roomDiv);

        // Simpan layout jika ini adalah ruangan yang baru dibuat
        if (shouldSave) {
            saveBaseLayout();
        }
    };

    // Fungsi untuk membuat elemen item dekorasi
    const createDecorItemElement = (itemInfo, isNew = true) => {
        const itemElement = document.createElement('img');
        itemElement.classList.add('decor-item');

        // Selalu gunakan gambar default dari decorItems
        const fullItemInfo = decorItems.find(it => it.id === itemInfo.id) || itemInfo;
        itemElement.src = fullItemInfo.image;

        // Jika ada gambar yang dipilih (dari localStorage), simpan di dataset
        if (itemInfo.selectedImageSrc) {
            itemElement.dataset.selectedImageSrc = itemInfo.selectedImageSrc;
        }

        itemElement.dataset.itemId = itemInfo.id;

        // Atur posisi
        itemElement.style.left = isNew ? '50%' : itemInfo.x;
        itemElement.style.top = isNew ? '50%' : itemInfo.y;

        // Atur ukuran dari data yang disimpan, atau gunakan default
        if (itemInfo.width) {
            itemElement.style.width = itemInfo.width;
            itemElement.style.height = 'auto'; // Pastikan tinggi menyesuaikan lebar
        }

        detailRoomContent.appendChild(itemElement);

        // Pastikan gambar sudah dimuat sebelum mengaktifkan drag
        itemElement.onload = () => {
            // Tambahkan event listener untuk drag-and-drop setelah gambar siap
            makeDraggable(itemElement);

            // Set text content jika ada (untuk note)
            if (itemInfo.textContent) {
                itemElement.dataset.textContent = itemInfo.textContent;
            }

            // Jika item baru, langsung simpan posisinya
            if (isNew) {
                saveDecorations();
                // Tampilkan tombol save jika item baru ditambahkan
                saveDecorBtn.classList.add('visible');
            }
        };
    };

    // Fungsi untuk membuat elemen bisa di-drag
    const makeDraggable = (element) => {
        let isDragging = false;
        let offsetX, offsetY;

        // Variabel untuk membedakan klik dan drag
        let startX, startY;
        let hasMoved = false;

        element.addEventListener('mousedown', (e) => {
            // Mencegah perilaku default browser seperti men-drag gambar atau menyeleksi teks
            e.preventDefault();

            isDragging = true;
            hasMoved = false; // Reset status pergerakan
            
            // Catat posisi awal untuk deteksi klik
            startX = e.clientX;
            startY = e.clientY;
            element.classList.add('dragging');

            // Hitung offset mouse dari pojok kiri atas elemen
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            
            // Tambahkan listener ke 'document' agar drag tetap berjalan
            // bahkan jika kursor keluar dari area elemen
            document.addEventListener('mousemove', onMouseMove);
            // Gunakan { once: true } agar listener mouseup otomatis dilepas setelah sekali jalan
            document.addEventListener('mouseup', onMouseUp, { once: true });
        });

        function onMouseMove(e) {
            if (!isDragging) return;
            const parentRect = detailRoomContent.getBoundingClientRect();

            // Jika mouse bergerak lebih dari beberapa piksel, anggap sebagai drag
            const moveThreshold = 5;
            if (!hasMoved && (Math.abs(e.clientX - startX) > moveThreshold || Math.abs(e.clientY - startY) > moveThreshold)) {
                hasMoved = true;
                element.classList.add('dragging'); // Terapkan style 'dragging' hanya saat benar-benar bergerak
            }

            // Hitung posisi baru
            let newX = e.clientX - parentRect.left - offsetX;
            let newY = e.clientY - parentRect.top - offsetY;

            // Batasi agar tidak keluar dari kontainer
            // onload memastikan offsetWidth/Height sudah benar
            newX = Math.max(0, Math.min(newX, parentRect.width - element.offsetWidth));
            newY = Math.max(0, Math.min(newY, parentRect.height - element.offsetHeight));

            element.style.left = `${(newX / parentRect.width) * 100}%`;
            element.style.top = `${(newY / parentRect.height) * 100}%`;
        }

        function onMouseUp() {
            isDragging = false;
            element.classList.remove('dragging');
            document.removeEventListener('mousemove', onMouseMove);

            // Logika untuk membedakan klik dan drag
            if (hasMoved) {
                // Jika ini adalah drag, tampilkan tombol save
                saveDecorBtn.classList.add('visible');
            } else {
                // Jika ini adalah klik (tidak bergerak)
                if (element.dataset.itemId.startsWith('photo')) { // Cek apakah ID dimulai dengan 'photo'
                    showPhotoFrameActionModal(element); // Selalu buka modal aksi
                } else if (element.dataset.itemId.startsWith('note')) { // Cek apakah ID dimulai dengan 'note'
                    // Jika ini adalah klik pada Note, buka modal aksi Note
                    showNoteActionModal(element);
                }
            }
        }
    };

    // Fungsi untuk menginisialisasi data Control Center jika belum ada di localStorage
    const initializeControlCenterDefaults = () => {
        const ccType = facilityTypes.find(type => type.id === 'control_center');
        if (ccType) {
            controlCenterElement.dataset.type = ccType.id;
            controlCenterElement.dataset.name = controlCenterElement.querySelector('span').textContent.trim(); // Ambil nama default dari HTML
            controlCenterElement.dataset.characters = '[]'; // Default kosong
            controlCenterElement.dataset.background = ccType.id; // Default background sesuai ID tipe
            controlCenterElement.dataset.decorations = '[]'; // Default dekorasi kosong
        }
    };

    // Fungsi untuk menyimpan tata letak base ke localStorage
    const saveBaseLayout = () => {
        const layoutData = [];

        // Simpan data Control Center terlebih dahulu
        // Control Center tidak akan memiliki x,y karena posisinya fixed
        layoutData.push({
            typeId: controlCenterElement.dataset.type,
            name: controlCenterElement.dataset.name,
            characters: JSON.parse(controlCenterElement.dataset.characters || '[]'),
            background: controlCenterElement.dataset.background, // Background ruangan
            // Data dekorasi untuk Control Center
            decorations: JSON.parse(controlCenterElement.dataset.decorations || '[]')
        });

        // Simpan data ruangan lain di lantai pertama
        // Iterasi melalui children dari firstFloor, kecuali add-room-button
        const roomsOnFloor = Array.from(firstFloor.children).filter(el => el.classList.contains('facility-room'));
        roomsOnFloor.forEach(room => {
            layoutData.push({
                typeId: room.dataset.type,
                name: room.dataset.name,
                characters: JSON.parse(room.dataset.characters || '[]'),
                background: room.dataset.background,
                // x dan y tidak lagi disimpan untuk ruangan karena menggunakan flexbox
            });
        });

        localStorage.setItem('arknightsBaseLayout', JSON.stringify(layoutData));
        console.log('Base layout saved!');
    };

    // Fungsi untuk menyimpan posisi item dekorasi ke dataset Control Center
    const saveDecorations = () => {
        if (!activeRoomElement || !activeRoomElement.classList.contains('control-center')) return;

        const decorElements = detailRoomContent.querySelectorAll('.decor-item');
        const decorationsData = [];
        decorElements.forEach(el => {
            decorationsData.push({
                id: el.dataset.itemId,
                x: el.style.left,
                y: el.style.top,
                selectedImageSrc: el.dataset.selectedImageSrc || null, // Simpan gambar yang dipilih (untuk photo frame)
                textContent: el.dataset.textContent || null, // Simpan teks (untuk note)
                width: el.style.width || null // Simpan lebar item
            });
        });
        activeRoomElement.dataset.decorations = JSON.stringify(decorationsData);
        saveBaseLayout(); // Panggil save utama untuk menulis ke localStorage
    };

    // Fungsi untuk memuat tata letak base dari localStorage
    const loadBaseLayout = () => {
        // Pastikan Control Center memiliki dataset default sebelum mencoba memuat
        initializeControlCenterDefaults();

        // Buat satu set ID karakter yang valid untuk pengecekan cepat
        const validCharIds = new Set(characterData.map(char => char.id));

        const savedLayout = localStorage.getItem('arknightsBaseLayout');
        if (savedLayout) {
            const layoutData = JSON.parse(savedLayout);

            // Kosongkan lantai pertama sebelum memuat ulang
            firstFloor.innerHTML = '';

            // Asumsi item pertama di layoutData adalah Control Center
            if (layoutData.length > 0 && layoutData[0].typeId === 'control_center') {
                const controlCenterData = layoutData.shift(); // Ambil dan hapus data Control Center dari array
                
                // Validasi karakter sebelum menetapkan ke dataset
                const loadedCCChars = controlCenterData.characters || [];
                const validCCChars = loadedCCChars.filter(id => validCharIds.has(id));

                controlCenterElement.dataset.type = controlCenterData.typeId;
                controlCenterElement.dataset.name = controlCenterData.name;
                controlCenterElement.dataset.characters = JSON.stringify(validCCChars);
                controlCenterElement.dataset.background = controlCenterData.background;
                // Muat data dekorasi untuk Control Center
                controlCenterElement.dataset.decorations = JSON.stringify(controlCenterData.decorations || []);
                controlCenterElement.querySelector('span').textContent = controlCenterData.name.toUpperCase();
            }

            // Muat ruangan lain
            layoutData.forEach(roomData => { // layoutData sekarang hanya berisi ruangan selain Control Center
                const roomType = facilityTypes.find(type => type.id === roomData.typeId);
                if (roomType) {
                    // Validasi karakter sebelum membuat elemen
                    const loadedRoomChars = roomData.characters || [];
                    const validRoomChars = loadedRoomChars.filter(id => validCharIds.has(id));

                    // Menggunakan data dari roomData secara langsung untuk properti yang disimpan
                    const roomInfo = {
                        ...roomType, // Salin properti dasar dari roomType (id, name, size, maxCharacters)
                        characters: JSON.stringify(validRoomChars), // Gunakan karakter yang sudah divalidasi
                        background: roomData.background, // Gunakan background yang tersimpan
                        textContent: roomData.textContent || null // Muat teks untuk note
                    };
                    createRoomElement(roomInfo, roomData.name, false);
                }
            });

            // Tambahkan kembali tombol add-room-button setelah semua ruangan dimuat
            firstFloor.appendChild(addRoomBtn);

            console.log('Base layout loaded.');
        }
    };

    // Fungsi untuk mengaktifkan/menonaktifkan mode edit posisi ruangan
    const toggleRoomEditMode = () => {
        isRoomEditMode = !isRoomEditMode;
        baseLayout.classList.toggle('edit-mode', isRoomEditMode);
        editPositionBtn.textContent = isRoomEditMode ? 'EXIT EDIT MODE' : 'EDIT POSITIONS';

        // Sembunyikan/tampilkan tombol lain
        addRoomBtn.style.display = isRoomEditMode ? 'none' : 'flex'; // add-room-btn adalah flex
        savePositionsBtn.style.display = isRoomEditMode ? 'inline-block' : 'none';
        savePositionsBtn.classList.remove('visible'); // Sembunyikan tombol save sampai ada perubahan

        const allRooms = document.querySelectorAll('.facility-room:not(.control-center)');
        allRooms.forEach(room => {
            if (isRoomEditMode) {
                // Saat masuk mode edit:
                room.draggable = true; // Aktifkan drag HTML5
                room.classList.add('reorder-draggable');

                // Tambahkan event listener untuk drag-and-drop
                room.addEventListener('dragstart', handleDragStart);
                room.addEventListener('dragover', handleDragOver);
                room.addEventListener('dragleave', handleDragLeave);
                room.addEventListener('drop', handleDrop);
                room.addEventListener('dragend', handleDragEnd);
            } else {
                // Saat keluar mode edit:
                room.draggable = false; // Nonaktifkan drag
                room.classList.remove('reorder-draggable');
                room.classList.remove('dragging');
                room.classList.remove('drag-over');

                // Hapus event listener drag-and-drop
                room.removeEventListener('dragstart', handleDragStart);
                room.removeEventListener('dragover', handleDragOver);
                room.removeEventListener('dragleave', handleDragLeave);
                room.removeEventListener('drop', handleDrop);
                room.removeEventListener('dragend', handleDragEnd);

                // Simpan urutan baru saat keluar mode edit
                saveBaseLayout();
            }
        });
    };

    // --- Event Handlers untuk Drag-and-Drop Pengurutan Ruangan ---
    function handleDragStart(e) {
        draggedRoom = this;
        e.dataTransfer.effectAllowed = 'move';
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault(); // Penting untuk mengizinkan drop
        e.dataTransfer.dropEffect = 'move';
        if (this !== draggedRoom && this.classList.contains('facility-room')) {
            this.classList.add('drag-over');
        }
    }

    function handleDragLeave() {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        if (draggedRoom !== this && this.classList.contains('facility-room')) {
            // Tentukan apakah akan menyisipkan sebelum atau sesudah target
            const rect = this.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            if (e.clientY < midY) {
                this.parentNode.insertBefore(draggedRoom, this);
            } else {
                this.parentNode.insertBefore(draggedRoom, this.nextSibling);
            }
            savePositionsBtn.classList.add('visible'); // Tampilkan tombol save karena ada perubahan
        }
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
        draggedRoom = null;
        // Hapus kelas drag-over dari semua elemen jika ada yang tersisa
        document.querySelectorAll('.facility-room.drag-over').forEach(el => el.classList.remove('drag-over'));
    }

    // Event listener untuk tombol edit posisi
    editPositionBtn.addEventListener('click', toggleRoomEditMode);
    // Event listener untuk tombol save posisi
    savePositionsBtn.addEventListener('click', () => {
        // Saat "SAVE" diklik, kita langsung keluar dari mode edit.
        // Fungsi toggleRoomEditMode() sudah otomatis menyimpan saat keluar.
        toggleRoomEditMode();
    });

    // Event delegation untuk menangani klik pada pilihan ruangan (tidak berubah)
    roomChoiceContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.room-choice-card');
        if (!card) return;
        const roomTypeId = card.dataset.type;
        const selectedType = facilityTypes.find(type => type.id === roomTypeId);
        if (selectedType) { showNamingForm(selectedType); }
    });

    // Panggil fungsi untuk mengisi modal saat halaman pertama kali dimuat
    populateRoomChoices();

    // Muat layout yang sudah ada
    loadBaseLayout();
});

// --- Penanganan Visibilitas Halaman untuk Mencegah Bug Animasi ---
document.addEventListener('visibilitychange', () => {
    // Ambil elemen dari DOM di dalam event listener jika diperlukan
    const roomDetailView = document.getElementById('room-detail-view');

    // Cek apakah kita sedang di dalam detail view
    if (roomDetailView && roomDetailView.classList.contains('visible')) {
        if (document.hidden) {
            // Jika tab disembunyikan, hentikan semua animasi chibi
            stopChibiMovement();
        } else {
            // Jika tab kembali terlihat, mulai ulang animasi dengan karakter yang seharusnya ada
            startChibiMovement(charactersInView);
        }
    }
});