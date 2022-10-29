import firebase from 'firebase/app';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_PROJECT_ERROR = 'DELETE_PROJECT_ERROR';

export interface IProject {
  id: string,
  title: string,
  content: string
}

export interface IProjectState {
  projects: IProject[] | null
}

export type CreateProjectAction = {
  type: typeof CREATE_PROJECT | typeof CREATE_PROJECT_ERROR
  project?: {title:string, content:string}
  err?: Error
} 

export type DeleteProjectAction  = { 
  type: typeof DELETE_PROJECT, 
  project: IFirebaseProject 
} | { 
  type: typeof DELETE_PROJECT_ERROR, 
  err: Error 
}

enum Period {
  OUR ='our',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}

export interface IFirebaseProject {
  id: string,
  authorFirstName: string,
  authorId: string,
  authorLastName: string
  content: string
  createdAt: firebase.firestore.Timestamp //firebase timestamp
  title: string
  frequencyObjective: {
    time: Time,
    unit: number
    period: Period
  }
}

export type ProjectActionTypes = CreateProjectAction | DeleteProjectAction

//draft types

export enum ProyectType {
  time, //accumulated time
  // TODO: functionality for the rest of the project types
  // hits, //accumulated hits
  // value, //track of an average value, e.g weight
  // results //description + results e.g crossfit results
}

export interface AccountableProjectBase {
  id: string,
  authorFirstName: string,
  authorId: string,
  authorLastName: string,
  content: string,
  createdAt: firebase.firestore.Timestamp, //firebase timestamp
  title: string,
  projectType: ProyectType
}

// Keeping the working tacky time type for a while. Remove later on!
// const hours = [
//   '00' , '01', '02', '03', '04', '05', '06', '07', '08',
//   '09' , '10', '11', '12', '13', '14', '15', '16', 
//   '17' , '18', '19', '20', '21', '22', '23', '24'
// ] as const

// type HH = typeof hours[number]

// const minutes = [
//   '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 
//   '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 
//   '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', 
//   '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', 
//   '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', 
//   '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
// ] as const 

// type MM = typeof minutes[number]

// type Time = `${HH}:${MM}`

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [Acc['length'], ...Acc]>

type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type StrRange<T extends number> = T extends NumberRange<0, 10>
  ? `${0}${T}`
  : `${T}`

type HH = StrRange<NumberRange<0, 24>>
type MM = StrRange<NumberRange<0, 60>> // 0...59
 
type Time =  `${HH}:${MM}`


// type HH = NumberRange<0, 25> // 0...59

// type ParseInt<T extends `text${number}`> =
//   T extends any
//   ? T extends `text${infer Digit extends number}` 
//     ? Digit
//     : never
//   : never

// type Result = ParseInt<"text0" | "text1" | "text2" | "text3" | "text4">;