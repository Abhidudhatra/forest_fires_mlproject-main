// $(".p").hide();
// $(".ans").hide();
// $("documnet").ready(()=>{
//     $(".bt").click(()=>{
//         e.preventDefault();
//         i1=$("#i1").val();
//         i2=$("#i2").val();
//         i3=$("#i3").val();
//         i4=$("#i4").val();
//         i5=$("#i5").val();
//         i6=$("#i6").val();
//         if(i1!='' && i2!='' && i3!='' && i4!='' && i5!='' && i6!='')
//         {
//             $(".p").show(1000);
//             $(".ans").show(1000);
//         }
//     });
//     $('form').submit(function(e){
//     });
// })
// let res=document.querySelector("#res");
// let resulte;
// res.innerHTML=` the reslute is ${resulte}`;

$(document).ready(() => {
  $(".p").hide();
  $(".ans").hide();

  $("form").submit(function (e) {
    e.preventDefault();
    let i1 = parseFloat($("#i1").val());
    let i2 = parseFloat($("#i2").val());
    let i3 = parseFloat($("#i3").val());
    let i4 = parseFloat($("#i4").val());
    let i5 = parseFloat($("#i5").val());
    let i6 = parseFloat($("#i6").val());
    let i7 = parseFloat($("#i7").val());
    let i8 = parseFloat($("#i8").val());
    let i9 = parseFloat($("#i9").val());

    // Validate non-negative input
    if ([i1, i2, i3, i4, i5, i6, i7, i8, i9].some((val) => val < 0)) {
      alert("All input values must be non-negative.");
      return;
    }

    $.ajax({
      url: $("form").attr("action"),
      type: "POST",
      data: $("form").serialize(),
      success: function (response) {
        if (response.error) {
          alert(response.error);
        } else {
          $("#res").text(`The result is ${response.result}`);
          $(".p").show(1000);
          $(".ans").show(1000);
        }
      },
      error: function () {
        alert("An error occurred while making the prediction.");
      },
    });
  });
});
