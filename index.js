$(function () {


    //sort
    $(".sort").on("mousedown", function () {
        $(this).removeClass("mouseup")
        $(this).addClass("mousedown")
    })
    $(".sort").on("mouseup", function () {
        $(this).removeClass("mousedown")
        $(this).addClass("mouseup")
    })
    $.fn.sortLi = function() {
        this
            .children()
            .sort((a,b) => $(a).data("order") - $(b).data("order") || -1)
            .appendTo(this);

        return this;
    }
    $(".sort").on("click", function () {
        if ($("#current li").length !== 0){
          $("#current").sortLi();
       }
    })


    //shake
    $(".nav-outer span").mouseover(function () {
       $(this).stop().animate({
         fontSize:25
       })
   })
    $(".nav-outer span").mouseleave(function () {
        $(this).stop().animate({
            fontSize:20
        })
    })

    //open create window
    $(".add").click(function () {
        $(".add-outer").eq(0).show();
        $(".bg").show();
    })

    //close create window
    $("#cancel").on("click", function () {
          close()
    })

    function close(){
        $(".add-outer").hide();
        $(".bg").hide();
    }

    //choose priority
    $(".priority button").on("click", function () {
        $(this).addClass("priority-current").siblings("button").removeClass("priority-current");
    })

    // get info and create
    $("#create").on("click", function () {
        $(".current-outer img").hide();
        $(".current-outer").css("text-align","left")
        let content = $(".add-outer input").val();
        let priority = $(".priority-current").attr('id');

        let order;
        if (priority === "high"){
            order = 1;
        }
        else if(priority === "medium"){
            order = 2;
        }else {
            order = 3;
        }
            if (content !== ""){
                $("#error").hide();
                let li = $("<li></li>")
                li.html("<span class=\"bookmark " + priority + "\"></span>\n" +
                    content +
                    "<span class=\"bin\"></span>\n" +
                    "<span class=\"checkmark\"></span>")
                li.attr("data-order",order);
                $("#current").append(li);
                $(".add-outer input").val("");
                close();
            }
            else{
                $(this).effect("shake");
                $("#error").show();
            }

    })

    function displayImg(){
        if($("#current li").length === 0){
            $(".current-outer img").show();
            $(".current-outer").css("text-align","center")
        }

    }

    //delete
    $("#current, #finished").on({
        mouseenter:function () {
            $(this).css("color","rgb(75, 131, 238)");
        },
        mouseleave:function () {
            $(this).css("color","");
        }
    },".bin")


    $("#current,#finished").on("click", ".bin",function () {
        $(this).parent().remove()
        displayImg();
    })

    //done
    $("#current, #finished").on({
        mouseenter:function () {
            $(this).css("color","rgb(75, 131, 238)");
        },
        mouseleave:function () {
            $(this).css("color","");
        }
    },".checkmark")
    $("#current").on("click", ".checkmark",function () {
        $(this).css("color","");
        $(this).parent().remove();
        let newli = $(this).parent().clone();
        newli.css("opacity",0.5);
        newli.appendTo("#finished");
        newli.children(".checkmark").html("");
        displayImg();
    })
    $("#finished").on("click", ".checkmark",function () {
        $(".current-outer img").hide();
        $(".current-outer").css("text-align","left")
        $(this).css("color","");
        $(this).parent().remove();
        let newli = $(this).parent().clone();
        newli.css("opacity",1);
        newli.appendTo("#current");
        newli.children(".checkmark").html("");
    })



})