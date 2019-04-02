/*
*
*  Log-sender.js does things that mess with content security policies.
*
* */

document.addEventListener("DOMContentLoaded", function () {
    // Add script into script element
    const externalBtn = document.getElementById('external');
    externalBtn.addEventListener('click', () => {
        loadExternalResource();
    });
    // Send Random Report to localhost:3000
    const pushRandomReport = document.getElementById('pushReport');
    pushRandomReport.addEventListener('click', () => {
        sendReport(generateReport());
    })
    // Send 10 Random Reports to localhost:3000
    const pushTenRandomReports = document.getElementById('pushTenReports');
    pushTenRandomReports.addEventListener('click', () => {
        for (let i = 0; i < 10; i++) {
            sendReport(generateReport());
        }
    })
    // Send 100 Random Reports to localhost:3000
    const pushOneHundredRandomReports = document.getElementById('pushOneHundredReports');
    pushOneHundredRandomReports.addEventListener('click', () => {
        for (let i = 0; i < 100; i++) {
            sendReport(generateReport());
        }
    })
});

function loadExternalResource(url) {
    fetch('https://code.jquery.com/jquery-3.3.1.slim.min.js')
        .then((res) => {
            // console.log(res);
            return res.text();
        })
        .then((response) => {
            // console.log(response);
            const scripts = document.getElementById('scripts');
            scripts.innerHTML = `<script>
                ${response}
                </script>
            `;
        })
        .catch(error => {
            console.error(error);
        });
}

function generateReport() {
    return {
        "document-uri": "http://localhost:3200",
        "blocked-uri": faker.internet.url(),
        "ip": faker.internet.ip(),
        "payload": faker.system.fileType()
    }
}

function sendReport(reportData) {
    console.log('Report Data:   ', reportData);
    const url = 'http://localhost:3000/report';
    $.ajax({
        type: "POST",
        url: url,
        data: reportData,
        cors: 'allow',
        success: (success) => console.log(success),
        dataType: 'application/x-www-form-urlencoded'
    });
}
