const lenArray = 20
const arr = []
let maxi = Number.MIN_VALUE
const x = []

const platformHeight = 20;
let barWidth, barHeight;

let swapping = false

function drawBars(a = Number.MAX_VALUE, b = Number.MAX_VALUE) {
    background(41, 52, 98)
    rect(0, (windowHeight - platformHeight-100), windowWidth, platformHeight)
    strokeWeight(5)
    let notInPlace = false
    for (let i = 0; i < lenArray; i++) {
        if(i == a || i == b) {
            fill(0, 255, 0, 255)
        }
        else {
            fill(0, 128, 0)
        }
        textSize(25)
        textAlign(CENTER)
        barHeight = (arr[i] / maxi) * (windowHeight - 145);
        if (x[i] < 10 + i * barWidth) {
            x[i] = min(x[i] + 3, 10 + i * barWidth)
        }
        else if (x[i] > 10 + i * barWidth) {
            x[i] = max(x[i] - 3, 10 + i * barWidth)
        }
        notInPlace = notInPlace || (x[i] !== 10 + i * barWidth)
        text(arr[i], x[i] + barWidth / 2, windowHeight - 125 - barHeight)
        rect(x[i], windowHeight - 120 - barHeight, barWidth, barHeight);
    }
    swapping = swapping && notInPlace
}


function swap(i, j) {
    let t
    // function to swap
    t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
    
    t = x[i]
    x[i] = x[j]
    x[j] = t
    
    swapping = true
}

function setup() {
    barWidth = (windowWidth - 20) / 20
    let cnv = createCanvas(windowWidth, (windowHeight - 100))
    cnv.position(0, 100)
    gen()
    //create slider for speed
    slider = createSlider(-33, 100, 25)
    slider.position(1710,40)
    noLoop()
}

function gen() {
    arr.length = 0
    x.length = lenArray
    for (let i = 0; i < lenArray; i++) {
        x[i] = 10 + i * barWidth
        let r
        do {
            r = int(random(0, 25))
        } while(arr.indexOf(r) !== -1)
        arr.push(r)
        if(r > maxi) {
            maxi = r
        }
    }
    drawBars()
}

let si = -10, sj = -10
let st = -10
let sort = "#";
let prev_sort = "#";

function bubbleSort() {
    si = 0
    sj = 0
    sort = "BUBBLE"
    loop()
}

function selectionSort() {
    si = 0
    sj = 0
    st = si
    sort = "SELECTION"
    loop()
}

function insertionSort() {
    si = 1
    sj = 0
    st = si
    sort = "INSERTION"
    loop()
}

function pause_play() {
    if(sort == "#") {
        sort = prev_sort;
    }
    else {
        prev_sort = sort;
        sort = "#"; 
    }
}

function draw() {
    if(sort == "BUBBLE") {
        /* 
            The following code has:
            sj is the first index to start from 0
            sj goes on increasing from 0 to len-si-1 
            this results in the largest number in the array to reach the end
            on reaching len-si-1 sj goes back to 0 and si increases in size by one => this is to reduce the sj range by 1 as the last position previously is occupied by the largest number
        */
        if(!swapping) {
            if(sj >= arr.length - si - 1) {
                sj = 0
                si++
            }
            if(si >= arr.length) {
                si = -10
                sj = -10
                sort = "#"
                noLoop()
            }
            sleep(1000 - slider.value() * 10)
            drawBars(sj, sj + 1)
            if(arr[sj] > arr[sj + 1]) {
                swap(sj, sj + 1)
            }
            ++sj;
        }
        else {
            drawBars(sj - 1, sj)
        }
    }
    else if(sort == "SELECTION") {
        if(!swapping) {
            if(sj >= arr.length) {
                ++si
                st = si
                sj = si
            }
            if(si >= arr.length) {
                si = -10
                sj = -10
                st = -10
                sort = "#"
                noLoop()
            }
            if(sj < arr.length) {
                drawBars(st, sj)
                sleep(1000 - slider.value() * 10)
                if(arr[sj] < arr[st]) {
                    st = sj
                }
                ++sj
            }
            if(sj >= arr.length) {
                swap(st, si)
            }
        }
        else {
            drawBars(st, si)
        }
    }
    else if(sort == "INSERTION") {
        if(!swapping) {
            if(sj < 0) {
                ++si
                sj = si - 1;
            }
            if(si >= arr.length) {
                si = -10
                sj = -10
                st = -10
                sort = "#"
                noLoop()
            }
            if(sj >=0) {
                drawBars(sj, sj + 1)
                sleep(1000 - slider.value() * 10)
                if(arr[sj] > arr[sj + 1]) {
                    swap(sj, sj + 1)
                }
                else {
                    sj = 0;
                }
                --sj;
            }
        }
        else {
            drawBars(sj + 1, sj + 2)
        }
    }
    frameRate(144)
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
