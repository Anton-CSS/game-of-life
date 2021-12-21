import drawField from "./drawField";

describe("drawField", () => {
  let el;
  let onCellClick;
  beforeEach(() => {
    onCellClick = jest.fn();
    el = document.createElement("div");
  });
  it("drawField is a function", () => {
    expect(drawField).toBeInstanceOf(Function);
  });

  it("drawField renders 12 cells for field 3x4", () => {
    drawField(
      el,
      [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      onCellClick
    );
    expect(el.querySelectorAll(".cell").length).toBe(12);
  });
  it("drawField renders cell with correct coordinates ", () => {
    const state = [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0],
      [1, 1, 1],
    ];
    drawField(el, state, onCellClick);
    state.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellEl = el.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        expect(cellEl).toBeTruthy();
        expect(
          cellEl.classList.contains(cell ? "cell__alive" : "cell__death")
        ).toBe(true);
        expect(
          cellEl.classList.contains(cell ? "cell__death" : "cell__alive")
        ).toBe(false);
      });
    });
  });

  // it('drawField renders correct state for cells(all alive)', () =>{
  //
  // })
  // it('drawField renders correct state for cells(all are dead)', () =>{
  //
  // })
  // it('drawField renders correct state for cells(mix 1)', () =>{
  //
  // })
  // it('drawField renders correct state for cells(mix 2)', () =>{
  //
  // })
  // it('drawField renders correct state for cells(mix 3)', () =>{
  //
  // })

  it("drawField calls onCellClick with proper params on cell click", () => {
    const state = [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0],
      [1, 1, 1],
    ];
    drawField(el, state, onCellClick);
    el.querySelector(`.cell.cell__alive[data-x="1"][data-y="2"]`).click();
    expect(onCellClick).toBeCalledWith(1, 2, true);
  });
});
