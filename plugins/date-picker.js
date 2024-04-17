import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
const app = createApp({})
app.use(Vue3PersianDatetimePicker, {
    name: 'DatePicker',
    props: {
        format: 'YYYY-MM-DD HH:mm',
        displayFormat: 'jYYYY-jMM-jDD',
        editable: false,
        inputClass: 'form-control my-custom-class-name',
        placeholder: 'Please select a date',
        altFormat: 'YYYY-MM-DD HH:mm',
        color: '#00acc1',
        autoSubmit: false,
    }
})