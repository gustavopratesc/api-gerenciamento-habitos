export function verificarHabito(habit, valor) {
  if (habit.tipo === "quantidade") {
    return Number(valor) >= habit.meta;
  }
  
  if (habit.tipo === "boolean") {
    return valor === "false"; // false = "não consumi açúcar"
  }

  return false;
}
