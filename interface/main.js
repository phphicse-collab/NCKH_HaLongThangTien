// Preview upload
        document.getElementById('imageInput').addEventListener('change', handleFiles);
        document.getElementById('videoInput').addEventListener('change', handleFiles);

        function handleFiles(e) {
            const files = e.target.files;
            const container = document.getElementById('previewContainer');
            for (let file of files) {
                const div = document.createElement('div');
                div.className = 'preview-item';
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    div.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    div.appendChild(video);
                }
                container.appendChild(div);
            }
            // Giả lập kết quả sau khi upload
            setTimeout(showFakeResult, 2000);
        }

        // Chat functionality
        function sendMessage() {
            const input = document.getElementById('chatInput');
            const msg = input.value.trim();
            if (!msg) return;

            const messages = document.getElementById('chatMessages');
            const userMsg = document.createElement('div');
            userMsg.className = 'message user';
            userMsg.textContent = msg;
            messages.appendChild(userMsg);

            // Giả lập phản hồi AI
            setTimeout(() => {
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai';
                aiMsg.textContent = `Cảm ơn mô tả! Tôi đã cập nhật: "${msg}" → Tăng độ tin cậy cho lễ hội phù hợp hơn.`;
                messages.appendChild(aiMsg);
                messages.scrollTop = messages.scrollHeight;
                updateResultFromChat(msg);
            }, 1000);

            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        }

        // Enter để gửi chat
        document.getElementById('chatInput').addEventListener('keypress', e => {
            if (e.key === 'Enter') sendMessage();
        });

        // Tab
        function openTab(evt, tabName) {
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            evt.currentTarget.classList.add('active');
        }

        // Giả lập kết quả
        function showFakeResult() {
            document.getElementById('resultCard').style.display = 'block';
            Plotly.newPlot('chart', [{
                x: ['Ok Om Bok', 'Chol Chnam Thmay', 'Tết Nguyên Đán'],
                y: [92, 65, 28],
                type: 'bar',
                marker: { color: ['#ff6b6b', '#4ecdc4', '#45b7d1'] }
            }], {
                title: 'Xác suất các lễ hội',
                height: 500
            });
        }

        function updateResultFromChat(text) {
            // Giả lập cập nhật từ mô tả chat
            if (text.toLowerCase().includes('đèn gió') || text.toLowerCase().includes('ghe ngo')) {
                document.getElementById('confidence').textContent = '95%';
                document.getElementById('resultText').innerHTML = 'Rất chắc chắn là lễ hội <strong>Ok Om Bok</strong> nhờ mô tả của bạn!';
            }
        }

        // Khởi tạo biểu đồ mặc định
        showFakeResult();