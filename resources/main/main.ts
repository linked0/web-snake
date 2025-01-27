let firstName: string = "john"

let age: number | string = 22 // OR "22"

let obj: { firstName: string, age: number } = { firstName: "john", age }

interface User {
    age?: number | string;
    firstName: string;
}


function createUser(firstName: string, age: number | string): User {
    if(age > 20) return { firstName }
    return {age, firstName}
}

let str = createUser("john", 22)

str.age

interface Login<Pwd> {
    email: string;
    password: Pwd
}

interface Member {
    userName: string;
    status: MemberStatus // Active Or Inactive Or New
}

enum MemberStatus {
    Active = "Active",
    Inactive = "Inactive",
    New = "New"
}

type PasswordType = string | number
type LoginResult = Promise<null | Member>

async function login(loginArgs: Login<PasswordType>): LoginResult {
    if(loginArgs.email === "email" && loginArgs.password === "password") {
        return { userName: "john", status: MemberStatus.Active }
    }else {
        return null
    }
}

login({ email: "email", password: "password" }).then(result => {
    if(!result) return
    if(result.status === MemberStatus.Active) console.log('user is Active')
})