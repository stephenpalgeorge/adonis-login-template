import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const username = request.input("username");
    const password = request.input("password");

    try {
      await auth.use('web').attempt(username, password);
      return response.redirect().toPath('/dashboard');
    } catch (e) {
      console.error(e);
      return response.badRequest('Invalid credentials');
    }
  }

  public async register({ request, auth, response }: HttpContextContract) {
    try {
      const newUserSchema = schema.create({
        email: schema.string({}, [rules.email()]),
        username: schema.string({ trim: true }, [
          rules.unique({ table: 'users', column: 'username' }),
        ]),
        password: schema.string({ trim: true }),
      });

      await request.validate({ schema: newUserSchema });

      const email = request.input("email");
      const username = request.input("username");
      const password = request.input("password");
      const newUser = new User();

      newUser.email = email;
      newUser.username = username;
      newUser.password = password;
      await newUser.save();
      await auth.use('web').attempt(username, password);
      return response.redirect().status(303).toPath('/welcome');
    } catch (e) {
      console.error(e);
      return response.badRequest(e.messages);
    }
  }
}
