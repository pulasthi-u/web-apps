<html>
    <style>
        section {
            background-color: aliceblue;
        }
        .sec {
            display: flex;
            height: 60vh;
            transform: translateY(10vh);
            border: 1px solid;
            overflow: hidden;
            
        }
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
        .sec::before {
            content: "";
            position: absolute;
            width: calc(100vw - 17px);
            height: 30vh;
            transform-origin: bottom left;
            transform: skewY(10deg);
            background-color: red;
        }
    </style>
    <section>
        <div class="sec">
            <img src="aerial1.jpeg">
            <div class="cont">
                Lorem Ipsum Dolor sit Amet
            </div>
        </div>
<!--
        <div class="sec">2</div>
        <div class="sec">3</div>
-->
    </section>
</html>