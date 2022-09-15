let rgb = {
    red: 155,
    green: 189,
    blue: 255
}

let quantityItems = 50;
let speedRange = [0.8, 1.2];
let itemSize = 3.2;


let width;
let height;
let itens = [];

let teste = document.getElementById("container").getBoundingClientRect();
let canvas = document.getElementById("canvas");
width = canvas.width = teste.width;
height =  canvas.height = teste.height;

window.addEventListener('resize', function(event) {
    let teste = document.getElementById("container").getBoundingClientRect();
    canvas.width = width = teste.width;
    canvas.height = height = teste.height;
}, true);

let context = canvas.getContext('2d');

function desenha(){

    context.clearRect(0,0, width, height);
    for(let i = 0; i < itens.length; i++)
    {
        context.beginPath();
        context.fillStyle = `rgba(${rgb.red},${rgb.green},${rgb.blue},1)`;
        context.arc(itens[i].position_x, itens[i].position_y, itemSize, (Math.PI/180)*0, (Math.PI/180)*360, true );
        context.fill();

        for(let j = 0; j < itens.length; j++)
        {
            let dist = Math.sqrt((Math.pow( itens[j].position_x - itens[i].position_x , 2)) + (Math.pow(itens[j].position_y - itens[i].position_y , 2)));

            if(dist < 200)
            {
                let cor = -0.0014572 * dist + 0.30144;
                context.beginPath();
                context.strokeStyle = `rgba(${rgb.red},${rgb.green},${rgb.blue},${cor})`;
                context.moveTo(itens[i].position_x, itens[i].position_y);
                context.lineTo(itens[j].position_x, itens[j].position_y);
                context.stroke();
            }
        }

        itens[i].position_x = itens[i].position_x + itens[i].velo_x;
        itens[i].position_y = itens[i].position_y + itens[i].velo_y;

        if(itens[i].velo_x >= 0) 
        {
           if(itens[i].position_x > itens[i].final_x)
           {
                itens[i] = genareteInitialItem();
           }     
        }
        else
        {
            if(itens[i].position_x < itens[i].final_x)
            {
                itens[i] = genareteInitialItem();
            } 
        }
    }

    let requestId = requestAnimationFrame(() => { this.desenha(); });
}


function generateInitialItens(qtd = 10)
{
    for(let i = 0; i < qtd; i++){
        itens[i] = genareteInitialItem();
    } 
}

function genareteInitialItem()
{
    let initial_y , initial_x , final_x , final_y;

    let leadingBorder = Math.round(Math.random() * 4);
    let finalBorder = Math.round(Math.random() * 4);

    if( leadingBorder === 1 || leadingBorder === 2 ){

        initial_y = Math.round(Math.random() * height);
        initial_x = leadingBorder === 1 ? 0 : width
        finalBorder = finalBorder === leadingBorder ? 3 : finalBorder;
    }
    else
    {
        initial_x = Math.round(Math.random() * width);
        initial_y = leadingBorder === 3 ? 0 : height
        finalBorder = finalBorder === leadingBorder ? 1 : finalBorder;
    }


    if( finalBorder === 1 || finalBorder === 2 )
    {
        final_y = Math.round(Math.random() * height);
        final_x = finalBorder === 1 ? 0 : width 
    }
    else
    {
        final_x = Math.round(Math.random() * width);
        final_y = finalBorder === 3 ? 0 : height;
    }

    let velo = randomIntFromInterval(speedRange[0], speedRange[1]);
    let distance = Math.sqrt((Math.pow( final_x - initial_x , 2)) + (Math.pow(final_y - initial_y , 2)));
    let velo_x = velo *((final_x - initial_x) / distance);
    let velo_y = velo *((final_y - initial_y) / distance);

    return itemFactory(final_x, final_y, initial_x, initial_y, velo_x, velo_y);
}

function itemFactory(final_x, final_y , position_x, position_y, velo_x, velo_y)
{
    return  {
        final_x: final_x,
        final_y: final_y,
        position_x: position_x,
        position_y: position_y,
        velo_x: velo_x,
        velo_y: velo_y,
    }
}


function randomIntFromInterval(min, max) 
{
    return Math.random() * (max - min + 1) + min;
}


generateInitialItens(quantityItems);
desenha();