$(document).ready(function () {
  // Basic wizard setup
  $('.steps-basic').steps({
    headerTag: 'h6',
    bodyTag: 'fieldset',
    transitionEffect: 'fade',
    titleTemplate: '<span class="number">#index#</span> #title#',
    labels: {
      previous: '<i class="ph-arrow-circle-left me-2"></i> Anterior',
      next: 'Próximo <i class="ph-arrow-circle-right ms-2"></i>',
      finish: 'Incluir <i class="ph-paper-plane-tilt ms-1"></i>'
    },
    onFinished: function (event, currentIndex) {
      var form = $(this).closest('form'); // Encontra o formulário pai do elemento atual
      form.submit(); // Isso aciona o envio do formulário
    }
  });

  setTimeout(function () {
    $('.steps-basic').removeClass('d-none');
    $('.load-steps-basic').addClass('d-none');
  }, 650);

  $('.keyup').keyup(function () {
    $(this).val($(this).val().toUpperCase());
  });

  $('.downcase').keyup(function () {
    $(this).val($(this).val().toLowerCase());
  });

  $('.letra_sistema').mask('Z', {
    translation: {
      'Z': {
        pattern: /[a-zA-Z]/, optional: false
      }
    }
  });

  $('.uf').mask('ZZ', {
    translation: {
      'Z': {
        pattern: /[a-zA-Z]/, optional: false
      }
    }
  });

  $('.cep').mask('00000-000');
  $('.data').mask('00/00/0000');
  $('.cpf').mask('000.000.000-00');
  $('.cpf-numeros').mask('00000000000');
  $('.cnpj').mask("00.000.000/0000-00");
  $('.telefone').mask("(00)00000-0000");
  $('.telefone_fixo').mask("(00)0000-0000");
  $('.numeros').mask('###000', { reverse: true });
  $('.vida-util-anos').mask("000", { reverse: true });
  $('.percentual-residual').mask("00%", { reverse: true });
  $('.processo_sei').mask('0000.000000/0000-00');
  $('.ano').mask('0000');
  $('.data_competencia').mask('00-0000');
  $('.tanque').mask('000'); 
  $('.portas').mask('0'); 
  $('.passageiro').mask('000');

  $('.latitude').mask('+-99.9999999', {
    translation: {
      '+': {pattern: /[+-]/, optional: true}, 
      '-': {pattern: /[+-]/, optional: true}  
    }
  });

  $('.longitude').mask('+-999.999999', {
    translation: {
      '+': {pattern: /[+-]/, optional: true}, 
      '-': {pattern: /[+-]/, optional: true}  
    }
  });

  $('.coordenada').mask('-999.999999', {
    translation: {
      '9': {
        pattern: /[0-9]/,
        optional: true
      }
    }
  });

  $('.real').maskMoney({
    thousands: '.',
    decimal: ','
  });

  $('.percentual-float').mask('00,00%', { reverse: true });

  $(".select2").select2({
    placeholder: "Selecione uma opção",
    allowClear: true,
    language: {
      noResults: function (params) {
        return "Sem resultados";
      }
    }
  });


  // adiciona as variaveis de estilos do bootstrap aos components do select2
  $(".select2").each(function () {
    if ($(this).hasClass("is-invalid")) {
      $(this).next('.select2-container').addClass('is-invalid');
      $(this).next('.select2-container').removeClass('is-valid');
    } else if ($(this).hasClass("is-valid")) {
      $(this).next('.select2-container').addClass('is-valid');
      $(this).next('.select2-container').removeClass('is-invalid');
    } else {
      $(this).next('.select2-container').removeClass('is-invalid');
      $(this).next('.select2-container').removeClass('is-valid');
    }
  });

  var DateTimePickers = function () {
    const _componentDaterange = function () {
      if (!$().daterangepicker) {
        console.warn('Aviso - daterangepicker.js não está carregado.');
        return;
      }

      $('.daterange-single').daterangepicker({
        parentEl: '.content-inner',
        singleDatePicker: true,
        locale: {
          format: "dd/mm/yyyy",
          daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          firstDay: 0 // Domingo como primeiro dia da semana
        }
      });
    }

    return {
      init: function () {
        _componentDaterang$('.latitude').mask('+-99.9999999', {
          translation: {
            '+': {pattern: /[+-]/, optional: true}, 
            '-': {pattern: /[+-]/, optional: true}  
          }
        });
      
        $('.longitude').mask('+-999.999999', {
          translation: {
            '+': {pattern: /[+-]/, optional: true}, 
            '-': {pattern: /[+-]/, optional: true}  
          }
        });e();
      }
    }
  }();

  document.addEventListener('DOMContentLoaded', function () {
    DateTimePickers.init();
  });


  
  $(document).on("click", "[data-confirm-delete]", function (event) {
  event.preventDefault();
  var link = $(this).attr("data-confirm-delete");
  var csrfToken = $(this).attr("data-csrf-token");

  Swal.fire({
    title: 'Tem certeza?',
    text: "Você não poderá reverter!",
    icon: 'warning',
    showCancelButton: true,
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-success"
    },
    confirmButtonText: 'Sim, tenho certeza!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      var form = $('#' + $(this).closest('form').attr('id'));

      var methodInput = $('<input type="hidden" name="_method" value="delete">');
      var csrfInput = $('<input type="hidden" name="authenticity_token" value="' + csrfToken + '">');

      form.attr('action', link);
      form.append(methodInput);
      form.append(csrfInput);
      form.submit();
    }
    });
  });
  $(document).on("click", "[data-confirm]", function (event) {
    event.preventDefault(); // Prevent the default form submission
    var message = $(this).attr("data-confirm"); // Get the confirmation message
    var form = $(this).closest('form'); // Find the closest form
  
    // Use SweetAlert for confirmation
    Swal.fire({
      title: 'Confirmação',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger "
      },
      confirmButtonText: 'Sim, tenho certeza!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        form.submit(); // Submit the form if confirmed
      }
    });
  });
  
  

});