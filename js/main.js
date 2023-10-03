
const pickerBtn = document.querySelector(".popup>.picker>button");
const clearBtn = document.querySelector(".popup>.picked-colors>.head>.clear-all");
const pickedColors = document.querySelector(".popup>.picked-colors>.colors");
let colors = JSON.parse(localStorage.getItem("picked-colors")) || [];

const copyColor = color => {

    const clr = color.textContent;
    navigator.clipboard.writeText(clr);

    color.textContent = "Copied";
    setTimeout(() => {
        color.textContent = clr;
    }, 600);

}

const showColors = () => {

    if (colors.length == 0)
        pickedColors.classList.add("hide");
    else
        pickedColors.classList.remove("hide");

    pickedColors.innerHTML = colors.map(color => `<li class="color">
                                                        <span style=background-color:${color}></span>
                                                        ${color}
                                                    </li>`).join("");

    document.querySelectorAll(".popup>.picked-colors>.colors>.color")
        .forEach(color => color.addEventListener("click", () => copyColor(color.lastChild)));
}

showColors();

const clearColors = () => {
    colors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(colors));
    pickedColors.classList.add("hide");
    pickedColors.innerHTML = "";
}


const pickeColor = async () => {

    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);

    if (!colors.includes(sRGBHex)) {
        colors.push(sRGBHex);
        localStorage.setItem("picked-colors", JSON.stringify(colors));
        showColors();
    }

};

console.log(colors);

pickerBtn.addEventListener("click", pickeColor);
clearBtn.addEventListener("click", clearColors);