$(document).ready(function () {
    var examples = [
        "What is the capital of France?",
        "How do I create a new folder in Windows?",
        "Can you explain the concept of object-oriented programming?",
        "What are the benefits of regular exercise?",
        "What is the formula for calculating the area of a circle?",
        "Can you create a basic python program that prints the current time?",
        "What is the official Meower website?"
    ];

    function setRandomPlaceholder() {
        var randomIndex = Math.floor(Math.random() * examples.length);
        var randomExample = examples[randomIndex];
        $("#questionInput").attr("placeholder", randomExample);
    }

    setRandomPlaceholder();

    $("#questionForm").submit(function (event) {
        event.preventDefault();

        var question = $("#questionInput").val();

        var requestData = {
            "question": question
        };

        $("#askButton").addClass("disabled").attr("disabled", true).text("Asking Geminium...");

        $.ajax({
            type: "POST",
            url: "https://geminium.joshatticus.online/api/geminium/ask",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function (response) {
                var converter = new showdown.Converter();
                var html = converter.makeHtml(response);
                $("#responseBox").html(html).fadeIn();
                Prism.highlightAll();
            },
            error: function () {
                $("#responseBox").text("An error occurred while processing your request.").fadeIn();
            },
            complete: function () {
                $("#askButton").removeClass("disabled").attr("disabled", false).text("Ask");
            }
        });
    });

    $("#questionInput").on("input", function () {
        if ($(this).val() === "") {
            setRandomPlaceholder();
        }
    });

    var currentYear = new Date().getFullYear();
    $("#currentYear").text(currentYear);
});