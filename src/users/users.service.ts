import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "role": "user"
    },
    {
      "id": 3,
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "role": "moderator"
    }
    ]

    findAll(role?: "Intern" | "Employee" | "Manager" | "Admin") {
        if (role) {
            return this.users.filter(user => user.role.toLowerCase() === role.toLowerCase())
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        return user;
    }

    create(user: {name: string, email: string, role: "Intern" | "Employee" | "Manager" | "Admin"}) {
        const usersByHighestId = {...this.users.sort((a, b) => b.id - a.id)}

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdate: {name?: string, email?: string, role?: "Intern" | "Employee" | "Manager" | "Admin"}) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...userUpdate }
            }
            return user;
        })

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}

