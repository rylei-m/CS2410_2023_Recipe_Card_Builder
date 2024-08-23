// Assuming you have imported or added the writeRecipeToFile function already.

document.getElementById('addIngredientBtn').addEventListener('click', function() {
    const ingredient = document.getElementById('newIngredient').value;
    if (ingredient) {
        const div = document.createElement("div");
        div.setAttribute('data-ingredient', ingredient);
        div.textContent = ingredient;
        div.addEventListener("click", () => div.remove());
        document.getElementById('ingredientsList').appendChild(div);
        document.getElementById('newIngredient').value = '';
    }
});

document.getElementById('addInstructionBtn').addEventListener('click', function() {
    const instruction = document.getElementById('newInstruction').value;
    if (instruction) {
        const div = document.createElement("div");
        div.setAttribute('data-instruction', instruction);
        div.textContent = instruction;
        div.addEventListener("click", () => div.remove());
        document.getElementById('instructionsList').appendChild(div);
        document.getElementById('newInstruction').value = '';
    }
    console.log("test3")
});

document.getElementById('exportRecipeBtn').addEventListener('click', function(e) {
    const ingredients = [...document.querySelectorAll('[data-ingredient]')].map(e => e.textContent);
    const instructions = [...document.querySelectorAll('[data-instruction]')].map(e => e.textContent);

    const recipe = {
        name: document.getElementById('recipeName').value,
        ingredients: ingredients,
        instructions: instructions
    };
    //addToEntryBox(recipe);
    console.log(e.target)
});

function addToEntryBox() {
    // Create the elements that make up the recipe entry
    const ingredients = [...document.querySelectorAll('[data-ingredient]')].map(e => e.textContent);
    const instructions = [...document.querySelectorAll('[data-instruction]')].map(e => e.textContent);

    const recipe = {
        name: document.getElementById('recipeName').value,
        ingredients: ingredients,
        instructions: instructions
    };

    const entryDiv = document.createElement('div');
    entryDiv.className = 'export1';
    const ul = document.createElement('ul');
    const h3 = document.createElement('h3');
    h3.textContent = recipe.name;

    ul.appendChild(h3);

    recipe.ingredients.forEach(ingredient => {
        const p = document.createElement('p');
        p.textContent = ingredient;
        ul.appendChild(p);
    })
    /*
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ul.appendChild(li);
    });
*/
    recipe.instructions.forEach(instruction => {
        const p = document.createElement('p');
        p.textContent = instruction;
        ul.appendChild(p);
    });

    entryDiv.appendChild(ul);

    // Append the new entry to the container
    document.getElementById('recipeContainer').appendChild(entryDiv);
    console.log("test2")

    writeRecipeToFile(recipe)
}


document.getElementById('resetFieldsBtn').addEventListener('click', function() {
    document.getElementById('recipeForm').reset();
    document.getElementById('ingredientsList').innerHTML = '';
    document.getElementById('instructionsList').innerHTML = '';
});

function writeRecipeToFile(recipe) {
    // taking from
    function download(text, filename){
      var blob = new Blob([text], {type: "text/html"});
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
    const output = `
      <html>
        <head>
          <style>
            :root {
              font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
            }
            h1 {
              background-color: rgb(15,35,57);
              color: white;
              padding: 16px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .b-main {
              width: 600px;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
            }
            .b-content {
              padding: 16px;
              display: flex;
              gap: 16px;
            }
            .b-ingredients {
              flex: 1
            }
            .b-instructions {
              flex: 1'
            }
          </style>
        </head>
        <body>
          <main class="b-main">
            <h1>${recipe.name}</h1>
            <div class="b-content">
              <div class="b-ingredients">
                <strong>Ingredients</strong>
                <hr>
                ${
                  recipe.ingredients.map(i => (
                    `
                      <div>${i}</div>
                    `
                  )).join('')
                }
              </div>
              <div class="instructions">
                <strong>Instructions</strong>
                <hr>
                ${
                  recipe.instructions.map((i, index) => (
                    `
                      <div>${index+1}: ${i}</div>
                    `
                  )).join('')
                }
              </div>
            </div>
          </main>
        </body>
      </html>
    `;
    download(output, `recipe-card.html`);
  }