"use strict";

(function () {

  const ajaxSend = async (formData) => {
      const fetchResp = await fetch('https://21.javascript.pages.academy/kekstagram', {
          method: 'POST',
          body: formData
      });
      if (!fetchResp.ok) {
        window.infoPost.openErrorWindow();
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
      }
      return window.infoPost.openSuccessWindow();
  };

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
      form.addEventListener('submit', function (e) {
          e.preventDefault();
          const formData = new FormData(this);

          ajaxSend(formData)
              .then((response) => {
                form.reset(); // очищаем поля формы
              })
              .catch((err) => (
                console.log(err)
            ));
      });
  });

})();
