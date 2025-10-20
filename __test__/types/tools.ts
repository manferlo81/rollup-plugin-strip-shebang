type TernaryExtends<A, B, P, F> = A extends B ? P : F

export type And<T extends readonly boolean[]> = TernaryExtends<false, T[number], false, true>
export type Or<T extends readonly boolean[]> = TernaryExtends<true, T[number], true, false>
export type Not<T extends boolean> = TernaryExtends<false, T, true, false>

export type AssignableTo<A extends B, B> = TernaryExtends<A, B, true, false>
export type Equals<A, B extends A> = TernaryExtends<A, B, TernaryExtends<B, A, true, false>, false>

export type Expect<T extends true> = T
