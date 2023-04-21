document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.trigger').forEach(trigger => {
    trigger.addEventListener('click', event => {
      const isActive = trigger.classList.contains('is-active');

      if (document.documentElement.classList.contains('has-active-popup')) {
        document.querySelectorAll('.trigger').forEach(trigger => {
          trigger.classList.remove('is-active');
          trigger.nextElementSibling.classList.remove('is-active');
        });
        document.documentElement.classList.remove('has-active-popup');
      }

      trigger.classList.toggle('is-active', !isActive);
      trigger.nextElementSibling.classList.toggle('is-active', !isActive);
      document.documentElement.classList.toggle('has-active-popup', !isActive);
    });
  });

  document.querySelectorAll('.wysiwyg').forEach(wysiwyg => {
    const hidden = wysiwyg.querySelector('.wysiwyg-hidden');
    const toggle = wysiwyg.querySelector('.wysiwyg-toggle');

    if (!hidden || !toggle) return;

    toggle.addEventListener('click', event => {
      hidden.classList.toggle('wysiwyg-hidden');
      toggle.classList.toggle('is-active')
    });
  });

  const urlParams = new URLSearchParams(window.location.search);

  document.querySelectorAll('.select-country').forEach(select => {
    const country = urlParams.get('country');
    const options = Array.from(select.options);

    const option = options.find(option => option.value === country);

    if (option) select.value = option.value;

    const custom = customSelect(select)[0];

    custom.select.addEventListener('change', event => {
      if (!event.target.value) urlParams.delete('country')
      else urlParams.set('country', event.target.value);
      window.location.search = urlParams.toString();
    });
  });

});
