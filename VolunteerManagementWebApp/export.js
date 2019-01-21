$(function () {
  var $startDate = $('#datetimepicker6');
  var $endDate = $('#datetimepicker7');

  $startDate.datetimepicker({
    showTodayButton: true,
    toolbarPlacement: 'bottom',
    sideBySide: true,
    icons: {
      today: 'today-button-pf'
    }
  });
  $endDate.datetimepicker({
    useCurrent: false,
    showTodayButton: true,
    toolbarPlacement: 'bottom',
    sideBySide: true,
    icons: {
      today: 'today-button-pf'
    }
  });
  $startDate.on('dp.change', function (e) {
    $endDate.data('DateTimePicker').minDate(e.date);
  });
  $endDate.on('dp.change', function (e) {
    $startDate.data('DateTimePicker').maxDate(e.date);
  });
});
