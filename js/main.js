(function ($) {
  "use strict";

  $(window).on('scroll', function() {
    if(localStorage.getItem("save") == 'true'){
      $("#form-rsv").hide()
      $("#form-thank-you").show()
    } else {
      $("#form-thank-you").hide()
      $("#form-rsv").show()
    }
  });

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".navbar").fadeIn("slow").css("display", "flex");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Scroll to Bottom
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scroll-to-bottom").fadeOut("slow");
    } else {
      $(".scroll-to-bottom").fadeIn("slow");
    }
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Gallery carousel
  $(".gallery-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1500,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });

  $("#save").click(function () {
    console.log("hello");

    var name = $("#name").val();

    var email = $("#email").val();
    var number = $("#number").val();
    var eat_pork = $("#eat_pork").val();
    var be_there = $("#be_there").val();
    console.log(be_there);
    var message = $("#message").val();

    console.log(name, email, number, eat_pork, be_there, message);

    $.ajax({
      url: "https://api-ap-northeast-1.hygraph.com/v2/clniskp4p10mn01t31tnzagsc/master",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        query: `mutation MyMutation {
        createRsvp(
          data: {fullName: "${name}", attend: "${be_there}", email: "${email}", message:" ${message}", mobileNumber: "${number}", nonePork: "${eat_pork}"}
        ) {
          id
        }
      }
    `,
      }),
      success: function (response) {
        // Handle the GraphQL response here
        console.log(response.data);
        generateqrcode(response.data.createRsvp.id);
      },
      error: function (error) {
        // Handle errors here
        console.error(error);
      },
    });
  });

  function generateqrcode(id) {
    // let qrcodeContainer = document.getElementById("qrcode");
    // qrcodeContainer.innerHTML = "";
    // new QRCode(qrcodeContainer, id);
    /*With some styles*/
    let qrcodeContainer2 = document.getElementById("qrcode-2");
    // qrcodeContainer2.innerHTML = id;
    new QRCode(qrcodeContainer2, {
      text: id,
      width: 150,
      height: 150,
      colorDark: " #5A86AD",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    document.getElementById("qrcode-container").style.display = "block";
    localStorage.setItem("save", true);
    $("#qrModal").modal();

 
  }

  $("#downloadQR").click(function () {
  // Convert the QR code to a data URL
  const qrCodeDataURL = document.querySelector("#qrcode-2 img").src;

  // Create a temporary anchor element
  const a = document.createElement("a");
  a.href = qrCodeDataURL;
  a.download = "qrcode.png";

  // Trigger a click event on the anchor element to download the QR code
  a.click();
  
  })
})(jQuery);
