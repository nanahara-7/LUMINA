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
  $(".c-nav__dropdown a").on("click", function() {
    $(".c-hamburger").removeClass("active");
    $("#header .c-nav").removeClass("active");
    $(".l-header__mask").removeClass("active");
    $(".c-nav__item--has-dropdown").removeClass("active");
    $(".c-nav__dropdown").stop(true, true).slideUp(300);
  });

  // 通常リンクをクリックでメニューを閉じる
  $(".c-nav__list > li:not(.c-nav__item--has-dropdown) a").on("click", function() {
    $(".c-hamburger").removeClass("active");
    $("#header .c-nav").removeClass("active");
    $(".l-header__mask").removeClass("active");
  });

  // モーダルウィンドウ 開閉
  $(".p-modal-open").on("click", function() {
    $(this).closest(".p-works__item").find(".p-works__modal").addClass("active");
  });

  $(".p-works__modal-close").on("click", function() {
    $(this).closest(".p-works__modal").removeClass("active");
  });

  $(".p-works__modal").on("click", function(e) {
    if ($(e.target).is(".p-works__modal")) {
      $(this).removeClass("active");
    }
  });

  // アコーディオン 開閉
  $(".p-faq__item dd").hide();

  $(".p-faq__item dt").on("click", function() {
    var $dt = $(this);
    var $dd = $dt.next("dd");
    var isOpen = $dt.hasClass("active");

    // 他の開いているアコーディオンをすべて閉じる
    $(".p-faq__item dt").not($dt)
      .removeClass("active")
      .next("dd").stop(true, true).slideUp(300);

    if (isOpen) {
      $dt.removeClass("active");
      $dd.stop(true, true).slideUp(300);
    } else {
      $dt.addClass("active");
      $dd.stop(true, true).slideDown(300);
    }
  });

  //フェードインアニメーション追加
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass("is-inview");
      }
    });
  });

  $(".fadein").each(function() {
    observer.observe(this);
  });

});

//タブクリック

$(function() {
  // 初期表示：全てをアクティブに
  $(".p-tab__item--all").addClass("is-active");
  $(".p-products__list--all").addClass("is-active");

  $(".p-tab__item").on("click", function() {
    const target = $(this).data("target");

    // アクティブをリセット
    $(".p-tab__item").removeClass("is-active");
    $(".p-products-list").removeClass("is-active");

    // クリックしたタブと対応するリストをアクティブに
    $(this).addClass("is-active");
    $("." + target).addClass("is-active");
  });
});



