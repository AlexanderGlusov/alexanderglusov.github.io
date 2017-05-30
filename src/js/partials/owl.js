$('.owl-carousel').owlCarousel({
    loop:true, //Зацикливаем слайдер
    margin:20, //Отступ от элемента справа в 50px
    nav:true, //Отключение навигации
    dots: false,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    autoplay:true, //Автозапуск слайдера
    smartSpeed:1000, //Время движения слайда
    autoplayTimeout:2000, //Время смены слайда
    responsive:{ //Адаптивность. Кол-во выводимых элементов при определенной ширине.
        0:{
            items:1
        },
        440:{
            items:2
        },
        770:{
            items: 3
        },
        1200:{
            items:4
        }
    }
});
