var theme_list_open = false;
$(document).ready(function () {

    $(window).resize(function () {
        var e = $('#switcher').outerHeight();
        $('#iframe').attr('height', ($(window).height() - e) + 'px')
    }).resize();

    $('#theme_select').click(function () {
        if (theme_list_open === true) {
            $('.center ul li ul').hide();
            theme_list_open = false;
        } else {
            $('.center ul li ul').show();
            theme_list_open = true;
        }
        return false;
    });
    var strHtml = '';
    $.each(website, function (key, item) {
        strHtml += ' <li class="button_a">' +
            '<a href="#" rel="' + key + '">' + item.name + item.label + '</a>';
        if (item.preview) {
            strHtml += '<img alt="" class="preview" src="' + item.preview + '"/>';
        }
        strHtml += '</li>';
    });
    $('#theme_list ul').html(strHtml);

    $('#theme_list ul li a').click(function () {
        var key = $(this).attr('rel');
        var item = website[key];
        if (item) {
            $('li.purchase a').attr('href', item.purchase);
            $('#iframe').attr('src', item.url);
            $('li.close a').attr('href', item.url);
            $('#theme_list a#theme_select').text(item.name);
        }
        $('.center ul li ul').hide();
        theme_list_open = false;
        return false
    });

    $('#theme_list ul li a').first().trigger('click');

    var clicked = 'desktop';
    var t = {
        desktop: ['100%', ''],
        tabletlandscape: [1040, 788],
        tabletportrait: [788, 1040],
        mobilelandscape: [500, 340],
        mobileportrait: [340, 500]
    };
    $('.responsive a').on('click', function () {
        var e = $(this);
        for (device in t) {
            $('#iframe-wrap').removeClass(device);
            if (e.hasClass(device)) {
                clicked = device;
                // $('#iframe').width(t[device][0]);
                // $('#iframe').height(t[device][1]);
                $('#iframe-wrap').addClass(device);
                $('.resize_select').change();
                if (clicked == device) {
                    $('.responsive a').removeClass('active');
                    e.addClass('active')
                }
            }
        }
        return false
    });
    $('.resize_select').attr('disabled', true).on('change', function () {
        // $('#iframe-wrap').css('zoom', $(this).val());
        // $('#iframe-wrap').css('top', Math.ceil(60 / $(this).val()) + 'px');
        if (!$('#iframe-wrap').hasClass('desktop')) {
            $(this).removeAttr('disabled');
            $('#iframe-wrap').css('transform', 'scale(' + $(this).val() + ')');
            $('#iframe-wrap').css('transform-origin', '50% 0 0');
        } else {
            $(this).attr('disabled', true);
            $(this).val(1);
            $('#iframe-wrap').css('transform', '');
            $('#iframe-wrap').css('transform-origin', '');
        }
    });
    // IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
    // if (IS_IPAD) {
    //     $('#iframe').css('padding-bottom', '60px')
    // }
});