const ckBoxes = document.querySelectorAll("input[type='checkbox']");
let lastChecked = ckBoxes.item(0);

const multiCheck = (e) => {
    console.log(e);
    let inBetween = false;
    if(e.shiftKey && e.target.checked){
        ckBoxes.forEach( el => {
            if(el === lastChecked || el === e.target) {
                inBetween = !inBetween;
            }

            if(inBetween) el.checked = true;
        });
    }
    lastChecked = e.target;
};

ckBoxes.forEach(el => el.addEventListener("click", multiCheck));
