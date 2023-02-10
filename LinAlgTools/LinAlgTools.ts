// ----- MATH-LIB ----- //

class Vector {
  private data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  // Length of the given vector
  l(): number {
    return this.data.length;
  }

  norm(): number {
    return GRAM_SCHMIDT.norm(this);
  }

  normalize(): Vector {
    return this.scale(1 / this.norm());
  }

  scale(s: number): Vector {
    let res: number[] = [];
    for (let i = 0; i < this.data.length; i++) {
      res.push(this.data[i] * s);
    }
    return new Vector(res);
  }

  static add(a: Vector, b: Vector): Vector {
    let res: number[] = [];
    if (a.l() != b.l())
      throw new Error(
        `Illegal argument exception. \n Vectors differ in length`
      );
    for (let i = 0; i < a.l(); i++) {
      res.push(a.getData()[i] + b.getData()[i]);
    }
    return new Vector(res);
  }

  // Dot product between two vectors
  static dot(A: Vector, B: Vector): number {
    let a = A.data;
    let b = B.getData();
    let res: number = 0;
    if (a.length != b.length)
      throw new Error(
        `Illegal argument exception. \n Vectors differ in length`
      );
    for (let i = 0; i < a.length; i++) {
      res += a[i] * b[i];
    }
    return res;
  }

  getData(): number[] {
    return this.data;
  }
}

class Matrix {
  public m: number;
  public n: number;
  private data: number[][];

  constructor(data: number[][]) {
    this.data = data;
    let a = data.length;
    let b = data[0]?.length;
    if (b === undefined || b === 0) throw new Error("No empty Matrix");
    this.m = b;
    this.n = a;
  }

  // Transposes Matrix inplace
  T(): void {
    let res: number[][] = new Array(this.m);
    for (let i = 0; i < this.m; i++) {
      let tmp: number[] = [];
      for (let j = 0; j < this.n; j++) {
        tmp.push(this.data[j][i]);
      }
      res[i] = tmp;
    }
    this.data = res;
    let t = this.m;
    this.m = this.n;
    this.n = t;
  }

  // Returns new transpose Matrix
  transpose(): Matrix {
    let res: number[][] = new Array(this.m);
    for (let i = 0; i < this.m; i++) {
      let tmp: number[] = [];
      for (let j = 0; j < this.n; j++) {
        tmp.push(this.data[j][i]);
      }
      res[i] = tmp;
    }
    return new Matrix(res);
  }

  // Multiply two matrices
  static multiply(A: Matrix, B: Matrix): Matrix {
    if (A.m == B.n) {
      let res: number[][] = new Array(A.n);
      for (let i = 0; i < res.length; i++) {
        res[i] = new Array(B.m).fill(0);
      }
      for (let j = 0; j < A.n; j++) {
        for (let k = 0; k < B.m; k++) {
          let s = 0;
          for (let i = 0; i < A.m; i++) {
            s += A.getData()[j][i] * B.getData()[i][k];
          }
          res[j][k] = s;
        }
      }
      return new Matrix(res);
    } else {
      throw new Error(
        "Illegal argument exception. Dimensions of given matrices dont match"
      );
    }
  }

  // Returns A*b, where A is a matrix and b is a vector
  static multiplyMatrixVector(matrix: Matrix, vector: Vector): Vector {
    if (matrix.getData()[0].length != vector.getData().length) {
      throw new Error(
        "Illegal argument exception. Dimensions of given matrix and vector dont match"
      );
    } else {
      let res: number[] = new Array(matrix.getData().length).fill(0);
      for (let i = 0; i < matrix.getData().length; i++) {
        let v = 0;
        for (let j = 0; j < matrix.getData()[0].length; j++) {
          v += matrix.getData()[i][j] * vector.getData()[j];
        }
        res[i] = v;
      }
      return new Vector(res);
    }
  }

  // Swap two rows of a matrix representation
  private swap(rowA: number, rowB: number): void {
    let tmp = this.data[rowA];
    this.data[rowA] = this.data[rowB];
    this.data[rowB] = tmp;
  }

  // Scale a row resulting in a vector (the scaled row)
  private scale(s: number, row: number): Vector {
    let r = this.data[row];
    r = r.map((e) => e * s);
    return new Vector(r);
  }

  // Adds vector v to row
  private add(row: number, v: Vector) {
    let res: number[] = [];
    for (let i = 0; i < v.l(); i++) {
      res.push(v.getData()[i] + this.data[row][i]);
    }
    this.data[row] = res;
  }

  // Row echelon form of a given matrix
  ref(): Matrix {
    let res: number[][] = this.data;
    let pivot = 0;
    let pivotRow = 0;

    while (pivot < this.m && pivotRow < this.m) {
      let col: number = -1;

      for (let i = pivotRow; i < this.n; i++) {
        if (res[i][pivot] != 0) {
          col = i;
          break;
        }
      }

      if (col != -1) {
        this.swap(col, pivotRow);
        let pE = res[pivotRow][pivot];
        res[pivotRow] = this.scale(1 / pE, pivotRow).getData();
        for (let i = pivotRow + 1; i < this.n; i++) {
          if (res[i][pivot] != 0) {
            this.add(i, this.scale(-res[i][pivot], pivotRow));
          }
        }
        pivotRow++;
      }
      pivot++;
    }
    return new Matrix(res);
  }

  // Reduced row echelon form of a given matrix
  rref(): Matrix {
    let res: number[][] = this.data;
    let pivot = 0;
    let pivotRow = 0;

    while (pivot < this.m && pivotRow < this.m) {
      let col: number = -1;

      for (let i = pivotRow; i < this.n; i++) {
        if (res[i][pivot] != 0) {
          col = i;
          break;
        }
      }

      if (col != -1) {
        this.swap(col, pivotRow);
        let pE = res[pivotRow][pivot];
        res[pivotRow] = this.scale(1 / pE, pivotRow).getData();
        for (let i = 0; i < this.n; i++) {
          if (i != pivotRow) {
            if (res[i][pivot] != 0) {
              this.add(i, this.scale(-res[i][pivot], pivotRow));
            }
          }
        }
        pivotRow++;
      }
      pivot++;
    }
    return new Matrix(res);
  }

  getData(): number[][] {
    return this.data;
  }
}

class ComplexNumber {
  public real: number;
  public img: number;

  constructor(real: number, img: number) {
    this.real = real;
    this.img = img;
  }

  add(other: ComplexNumber) {
    return new ComplexNumber(this.real + other.real, this.img + other.img);
  }

  subtract(other: ComplexNumber) {
    return new ComplexNumber(this.real - other.real, this.img - other.img);
  }

  scale(number: number) {
    return new ComplexNumber(this.real * number, this.img * number);
  }

  multiply(other: ComplexNumber) {
    return new ComplexNumber(
      this.real * other.real - this.img * other.img,
      this.img * other.real + this.real * other.img
    );
  }

  divide(other: ComplexNumber) {
    let a = other.real;
    let b = other.img;
    let c = this.real;
    let d = this.img;
    let nReal = (c * a + b * d) / (a * a + b * b);
    let nImg = (a * d - c * b) / (a * a + b * b);
    return new ComplexNumber(nReal, nImg);
  }
}

// ----- TOOLS ----- //

class FreeVariableGenerator {
  char: number = "a".charCodeAt(0);
  freeVar(): string {
    this.char++;
    return String.fromCharCode(this.char - 1);
  }
}

// --- GAUSS --- //

class Solution {
  private data: (string | number)[];
  constructor(data: (string | number)[]) {
    this.data = data;
  }
  getData(): (string | number)[] {
    return this.data;
  }
}

class GAUSS {
  static solve(A: Matrix, b: Vector): Solution | null {
    const freeVarGen: FreeVariableGenerator = new FreeVariableGenerator();
    let freeVars: string[] = [];
    for (let i = 0; i < b.l(); i++) {
      freeVars.push(freeVarGen.freeVar());
    }
    let data = A.getData();
    data.forEach((e, i) => e.push(b.getData()[i]));
    let RREF = new Matrix(data).rref();
    let res: (string | number | null)[] = new Array(data[0].length - 1).fill(0);

    let pivots: number[] = [];
    let pivotsFrom = 0;
    for (let i = 0; i < RREF.getData()[0].length - 1; i++) {
      for (let j = pivotsFrom; j < RREF.getData().length; j++) {
        if (RREF.getData()[j][i] != 0) {
          pivots.push(i);
          pivotsFrom = j + 1;
          break;
        }
      }
    }

    pivots.forEach((e) => (res[e] = -1));
    res = res.map((e, i) => (e != -1 ? freeVars[i] : null));

    for (let i = data.length - 1; i >= 0; i--) {
      let solutionFor = 0;
      let tmpRes: (string | number)[] = [
        RREF.getData()[i][RREF.getData()[0].length - 1],
      ];
      for (let j = data[0].length - 2; j >= 0; j--) {
        if (RREF.getData()[i][j] != 0) {
          solutionFor = j;
          if (res[j] != null) {
            tmpRes.push("-(" + res[j] + "*" + RREF.getData()[i][j] + ")");
          }
        }
      }
      res[solutionFor] = tmpRes.join("+");
    }

    return new Solution(res as (number | string)[]);
  }
  static ref(A: Matrix): Matrix {
    return A.ref();
  }
  static rref(A: Matrix): Matrix {
    return A.rref();
  }
}

// --- LEAST-SQUARES --- //

class LEAST_SQAURES {
  static solve(A: Matrix, b: Vector) {
    let lhs = Matrix.multiply(A.transpose(), A);
    let rhs = Matrix.multiplyMatrixVector(A.transpose(), b);
    return GAUSS.solve(lhs, rhs);
  }
}

// --- GRAM-SCHMIDT --- //

class GRAM_SCHMIDT {
  static euclidean_scalar_product(a: Vector, b: Vector): number {
    return Vector.dot(a, b);
  }

  static norm(
    a: Vector,
    sp: (a: Vector, b: Vector) => number = this.euclidean_scalar_product
  ): number {
    return Math.sqrt(sp(a, a));
  }

  static orthogonalize(vectors: Vector[]): Vector[] {
    if (vectors.length == 0) return [];
    let n = vectors.length;
    let b = vectors[0].getData().length;
    for (let i = 1; i < n; i++) {
      if (b != vectors[i].getData().length)
        throw new Error("Use vectors of the same length");
    }
    if (n > b) {
      throw new Error(
        "Cannot orthogonalize a set of vectors of length n, where the vectors are in R^b and b < n"
      );
    } else {
      let a1 = vectors[0].normalize();
      let aVectors = [a1];
      let bTilde;
      for (let i = 1; i < vectors.length; i++) {
        bTilde = vectors[i];
        for (let j = 0; j < i; j++) {
          bTilde = Vector.add(
            bTilde,
            aVectors[j].scale(
              -this.euclidean_scalar_product(vectors[i], aVectors[j])
            )
          );
        }
        aVectors.push(bTilde.normalize());
      }
      return aVectors;
    }
  }
}

// --- QR-Decomposition --- //

class QR {
  static decompose(M: Matrix): [Matrix, Matrix] {
    let columns = M.transpose()
      .getData()
      .map((e) => new Vector(e));
    let Q_cols = GRAM_SCHMIDT.orthogonalize(columns);
    let Q = new Matrix(Q_cols.map((e) => e.getData())).transpose();
    let R = Matrix.multiply(Q.transpose(), M);
    return [Q, R];
  }
}

export { Matrix, Vector, GAUSS, GRAM_SCHMIDT, QR, LEAST_SQAURES, Solution };
