
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

const redInput = document.getElementById("redInput");
const greenInput = document.getElementById("greenInput");
const blueInput = document.getElementById("blueInput");

const redValue = document.getElementById("redValue");
const greenValue = document.getElementById("greenValue");
const blueValue = document.getElementById("blueValue");

const colorPreview = document.getElementById("colorPreview");
const previewHex = document.getElementById("previewHex");

const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");

const colorHistory = document.getElementById("colorHistory");

const copyHex = document.getElementById("copyHex");
const copyRgb = document.getElementById("copyRgb");
const resetButton = document.getElementById("resetButton");

const copyToast = document.getElementById("copyToast");

let history = [];

function decimalToHex(value) {
    return Number(value)
        .toString(16)
        .padStart(2, "0");
}

function generateHex(r, g, b) {
    return (
        "#" +
        decimalToHex(r) +
        decimalToHex(g) +
        decimalToHex(b)
    ).toUpperCase();
}

function clamp(value) {
    value = Number(value);

    if (isNaN(value)) {
        return 0;
    }

    return Math.min(
        255,
        Math.max(0, value)
    );
}

function getTextColor(r, g, b) {
    const brightness =
        (r * 299 +
        g * 587 +
        b * 114) / 1000;

    return brightness > 145
        ? "#111111"
        : "#ffffff";
}

function updateColor(r, g, b, saveHistory = true) {
    r = clamp(r);
    g = clamp(g);
    b = clamp(b);

    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hex = generateHex(r, g, b);

    colorPreview.style.backgroundColor = rgb;

    colorPreview.style.boxShadow =
        `0 20px 60px ${hex}55`;

    const textColor =
        getTextColor(r, g, b);

    previewHex.style.color = textColor;

    hexValue.textContent = hex;
    rgbValue.textContent = rgb;
    previewHex.textContent = hex;

    red.value = r;
    green.value = g;
    blue.value = b;

    redInput.value = r;
    greenInput.value = g;
    blueInput.value = b;

    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;

    if (saveHistory) {
        addToHistory(hex);
    }
}

function addToHistory(hex) {
    history = history.filter(
        color => color !== hex
    );

    history.unshift(hex);

    history = history.slice(0, 8);

    renderHistory();
}

function renderHistory() {
    colorHistory.innerHTML = "";

    if (history.length === 0) {
        colorHistory.innerHTML = `
            <div class="empty-history">
                <i class="bi bi-clock-history"></i>
                <span>
                    Tus colores aparecerán aquí
                </span>
            </div>
        `;

        return;
    }

    history.forEach(hex => {
        const colorElement =
            document.createElement("div");

        colorElement.className =
            "history-color";

        colorElement.style.backgroundColor =
            hex;

        colorElement.innerHTML = `
            <span>
                ${hex}
            </span>
        `;

        colorElement.addEventListener(
            "click",
            () => {
                const rgb = hexToRgb(hex);

                updateColor(
                    rgb.r,
                    rgb.g,
                    rgb.b,
                    false
                );
            }
        );

        colorHistory.appendChild(
            colorElement
        );
    });
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");

    return {
        r: parseInt(
            hex.substring(0, 2),
            16
        ),

        g: parseInt(
            hex.substring(2, 4),
            16
        ),

        b: parseInt(
            hex.substring(4, 6),
            16
        )
    };
}

red.addEventListener(
    "input",
    () => {
        updateColor(
            red.value,
            green.value,
            blue.value
        );
    }
);

green.addEventListener(
    "input",
    () => {
        updateColor(
            red.value,
            green.value,
            blue.value
        );
    }
);

blue.addEventListener(
    "input",
    () => {
        updateColor(
            red.value,
            green.value,
            blue.value
        );
    }
);

redInput.addEventListener(
    "input",
    () => {
        updateColor(
            redInput.value,
            greenInput.value,
            blueInput.value
        );
    }
);

greenInput.addEventListener(
    "input",
    () => {
        updateColor(
            redInput.value,
            greenInput.value,
            blueInput.value
        );
    }
);

blueInput.addEventListener(
    "input",
    () => {
        updateColor(
            redInput.value,
            greenInput.value,
            blueInput.value
        );
    }
);

function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            showToast();
        });
}

copyHex.addEventListener(
    "click",
    () => {
        copyToClipboard(
            hexValue.textContent
        );
    }
);

copyRgb.addEventListener(
    "click",
    () => {
        copyToClipboard(
            rgbValue.textContent
        );
    }
);

let toastTimeout;

function showToast() {
    copyToast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(
        () => {
            copyToast.classList.remove(
                "show"
            );
        },
        1800
    );
}

resetButton.addEventListener(
    "click",
    () => {
        updateColor(
            0,
            0,
            0
        );
    }
);

updateColor(
    0,
    0,
    0,
    false
);