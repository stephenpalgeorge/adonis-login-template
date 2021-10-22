import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  public async home({ view }: HttpContextContract) {
    return view.render('home');
  }

  public async login({ view }: HttpContextContract) {
    return view.render('login');
  }

  public async dashboard({ view }: HttpContextContract) {
    return view.render('dashboard');
  }

  public async welcome({ view }: HttpContextContract) {
    return view.render('welcome');
  }

  public async register({ view }: HttpContextContract) {
    return view.render('register');
  }
}
