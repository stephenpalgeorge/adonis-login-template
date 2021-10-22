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

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout();
    return response.redirect().toRoute('pages.login');
  }

  public async register({ request, auth, response, session }: HttpContextContract) {
    try {
      const newUserSchema = schema.create({
        email: schema.string({}, [rules.email()]),
        username: schema.string({ trim: true }, [
          rules.unique({ table: 'users', column: 'username' }),
        ]),
        password: schema.string({ trim: true }, [
          rules.confirmed('passwordConfirm'),
          rules.maxLength(32),
          rules.minLength(8),
          rules.regex(/(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/),
        ]),
      });

      const data = await request.validate({
        schema: newUserSchema,
        messages: {
          'email.required': 'You must enter an email address',
          'username.required': 'You must enter a username',
          'username.unique': 'That name\'s taken...try another',
          'password.required': 'You must enter a password',
          'password.confirmed': 'Passwords didn\'t match...',
          'password.maxLength': 'Password too long',
          'password.minLength': 'Password too short',
          'password.regex': 'Password too weak (no offence)',
        }
      });
      const { email, username, password } = data;
      const newUser = new User();

      newUser.email = email;
      newUser.username = username;
      newUser.password = password;
      await newUser.save();
      await auth.use('web').attempt(username, password);
      return response.redirect().status(303).toPath('/welcome');
    } catch (e) {
      console.error(e);
      session.flash('errors', e.messages);
      return response.redirect().back();
    }
  }
}
