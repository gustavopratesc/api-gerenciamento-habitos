const API = "http://localhost:3000/api/habitos";


// 1. Carregar hábitos do backend

async function loadHabits() {
  const res = await fetch(API);
  const habits = await res.json();

  document.getElementById("totalHabitos").textContent = habits.length;

  renderHabits(habits);
}

// Renderizar os cards
function renderHabits(habits) {
  const container = document.getElementById("habitList");
  container.innerHTML = "";

  habits.forEach(h => {
    let input = "";

    if (h.tipo === "quantidade") {
      input = `<input type="number" id="input_${h.id}" placeholder="Valor do dia">`;
    } else {
      input = `
        <select id="input_${h.id}">
          <option value="false">Não consumi açúcar</option>
          <option value="true">Consumi açúcar</option>
        </select>
      `;
    }

    container.innerHTML += `
      <div class="habit-card">
        <h4>${h.nome}</h4>
        <p>Meta: ${h.tipo === 'quantidade' ? h.meta : "Não consumir"}</p>
        ${input}
        <button class="btn btn-enviar" onclick="registrarHabitoFront(${h.id})">Registrar</button>
      </div>
    `;
  });
}


// 2. Registrar hábito via API

async function registrarHabitoFront(habitId) {
  const valor = document.getElementById(`input_${habitId}`).value;

  if (!valor) return alert("Preencha o valor!");

  const res = await fetch(API + "/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ habitId, valor })
  });

  const data = await res.json();

  if (data.cumpriu) {
    alert("✔ Hábito cumprido! +10 pontos");
  } else {
    alert("Meta não atingida.");
  }

  loadProgress();
}


// 3. Carregar progresso atualizado

async function loadProgress() {
  const res = await fetch(API + "/progresso");
  const prog = await res.json();

  // Nível
  const nivel = Math.floor(prog.pontos / 100) + 1;
  const porcentagem = prog.pontos % 100;
  const falta = 100 - porcentagem;

  document.getElementById("nivel").textContent = nivel;
  document.getElementById("pontosTotais").textContent = prog.pontos;
  document.getElementById("porcentagem").textContent = porcentagem + "%";
  document.getElementById("progressBar").style.width = porcentagem + "%";
  document.getElementById("faltaProximoNivel").textContent = falta;

  // Streak
  document.getElementById("streakDias").textContent = prog.streak;

  // Check-ins hoje
  const hoje = new Date().toISOString().split("T")[0];
  document.getElementById("checkinsHoje").textContent = prog.registros?.[hoje]?.length || 0;
}


// 4. Inicialização

loadHabits();
loadProgress();
