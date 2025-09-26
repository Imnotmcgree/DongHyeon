(function() {
    // EmailJS public key
    emailjs.init('g3nqGYoOg8uBwrKFQ');
})();

window.onload = function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // 아래 'YOUR_SERVICE_ID'를 EmailJS 대시보드에서 발급받은 실제 Service ID로 교체해주세요.
            emailjs.sendForm('service_8f5htho', 'template_qcf3pvs', this)
                .then(function() {
                    console.log('SUCCESS!');
                    alert('메일이 성공적으로 전송되었습니다, 감사합니다!');
                    form.reset(); // 폼 초기화
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('메일 전송에 실패했습니다.');
                });
        });
    }
}
