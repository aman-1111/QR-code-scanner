 let html5QrcodeScanner = null;
        const resultContainer = document.getElementById('result');
        const stopButton = document.getElementById('stopButton');

        function onScanSuccess(decodedText, decodedResult) {
            resultContainer.innerHTML = `Scanned Result: <strong>${decodedText}</strong>`;
            resultContainer.style.display = 'block';
            stopScanner(); // Auto-stop after successful scan
        }

        function onScanFailure(error) {
            console.log(`Scan failed: ${error}`);
        }

        function startScanner() {
            if (!html5QrcodeScanner) {
                html5QrcodeScanner = new Html5QrcodeScanner(
                    "reader",
                    { 
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.0
                    },
                    false
                );
            }

            html5QrcodeScanner.render(onScanSuccess, onScanFailure);
            stopButton.style.display = 'block';
            document.querySelector('button[onclick="startScanner()"]').style.display = 'none';
        }

        function stopScanner() {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().then(() => {
                    resultContainer.style.display = 'block';
                    stopButton.style.display = 'none';
                    document.querySelector('button[onclick="startScanner()"]').style.display = 'block';
                }).catch(err => {
                    console.error("Failed to clear scanner: ", err);
                });
            }
        }

        window.addEventListener('beforeunload', () => {
            stopScanner();
        });