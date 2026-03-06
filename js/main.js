$(function() {


  // ハンバーガーメニュー 開閉

  $(".c-hamburger").on("click", function() {
    $(this).toggleClass("active");
    $("#header .c-nav").toggleClass("active");
    $(".l-header__mask").toggleClass("active");
  });

  $(".l-header__mask").on("click", function() {
    $(".c-hamburger").removeClass("active");
    $("#header .c-nav").removeClass("active");
    $(this).removeClass("active");
    $(".c-nav__item--has-dropdown").removeClass("active");
    $(".c-nav__dropdown").stop(true, true).slideUp(300);
  });

  
  // ドロップダウンメニュー 開閉

  $(".c-nav__item--has-dropdown > span").on("click", function(e) {
    e.stopPropagation();
    var $li       = $(this).parent();
    var $dropdown = $(this).next(".c-nav__dropdown");
    var isOpen    = $li.hasClass("active");

    // 他の開いているドロップダウンをすべて閉じる
    $(".c-nav__item--has-dropdown").not($li)
      .removeClass("active")
      .find(".c-nav__dropdown").stop(true, true).slideUp(300);

    if (isOpen) {
      $li.removeClass("active");
      $dropdown.stop(true, true).slideUp(300);
    } else {
      $li.addClass("active");
      $dropdown.stop(true, true).slideDown(300);
    }
  });

  // ドロップダウン内のリンクをクリックでメニューを全て閉じる
  $(".c-nav__dropdown a").on("click", function(e) {
    e.preventDefault(); // ← 未完成ページへの遷移を一時停止（ページ完成後に削除）
    $(".c-hamburger").removeClass("active");
    $("#header .c-nav").removeClass("active");
    $(".l-header__mask").removeClass("active");
    $(".c-nav__item--has-dropdown").removeClass("active");
    $(".c-nav__dropdown").stop(true, true).slideUp(300);
  });

  // 通常リンクをクリックでメニューを閉じる
  $(".c-nav__list > li:not(.c-nav__item--has-dropdown) a").on("click", function(e) {
    e.preventDefault(); // ← 未完成ページへの遷移を一時停止（ページ完成後に削除）
    $(".c-hamburger").removeClass("active");
    $("#header .c-nav").removeClass("active");
    $(".l-header__mask").removeClass("active");
  });

});
