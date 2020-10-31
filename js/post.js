"use strict";

(function () {

  const ajaxSend = async function (formData) {
    const url = `https://21.javascript.pages.academy/kekstagram`;
    const fetchResp = await fetch(url, {
      method: `POST`,
      body: formData
    });
    if (!fetchResp.ok) {
      window.infoPost.openErrorWindow();
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
    }
    return window.infoPost.openSuccessWindow();
  };

  const forms = document.querySelectorAll(`form`);
  forms.forEach((form) => {
    form.addEventListener(`submit`, function (e) {
      e.preventDefault();

      // eslint-disable-next-line no-invalid-this
      const formData = new FormData(this);

      ajaxSend(formData)
              .then(() => {
                form.reset(); // очищаем поля формы
              })
              .catch((err) => (
                // eslint-disable-next-line no-sequences
                form.reset(),
                // eslint-disable-next-line no-console
                console.log(err)
              ));
    });
  });

})();
