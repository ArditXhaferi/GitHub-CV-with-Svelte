<script>
    // const container = document.querySelector(".entry");
    // console.log(container)
    // container.addEventListener("mousemove", (e) => {
    //     const eyes = document.querySelectorAll(".eye");
    //     [].forEach.call(eyes, function (eye) {
    //         let mouseX = eye.getBoundingClientRect().right;
    //         if (eye.classList.contains("eye-left")) {
    //             mouseX = eye.getBoundingClientRect().left;
    //         }
    //         let mouseY = eye.getBoundingClientRect().top;
    //         let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
    //         let rotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 180;
    //         eye.style.transform = `rotate(${rotationDegrees}deg)`;
    //     });
    // });
</script>

<div class="entry">
    <img src="./github.png">
    <div>
        <h1>How Bad Is Your GitHub Profile?</h1>
        <h4>Check urself before you wreck urself in those FAANG interviews</h4>
    </div>
</div>

<style>
    h1{
        font-size: 40px;
    }
    h4{
        font-weight: 400;
        font-size: 18px;
    }
    .entry {
        text-align: center;
        display: flex;
        height: 100%;
        flex-direction: column;
        color: black;
        background-color: white;
        border-radius: 16px;
        padding: 24px 40px;
        align-items: center;
    }

    .entry img{
        width: 100px;
        height: auto;
    }
</style>
