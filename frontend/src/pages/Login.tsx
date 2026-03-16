import { Container } from '#/components/Container'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { CardWrapper } from '#/components/CardWrapper'
import { LoginForm } from '#/features/auth/login/LoginForm'

export const Login = () => {
  return (
    <section className="w-full">
      <Container className="max-w-[95%] sm:w-md mt-5  w-full mx-auto ">
        <CardWrapper>
          <Link to=".." title="go-back">
            <ArrowLeft className="text-primary-foreground" />
          </Link>

          <h2 className="text-center text-3xl font-bold text-primary-foreground/90">
            Welcome Back!
          </h2>

          <LoginForm />
          <div>
            <div className="mx-auto mt-6 mb-3 border-b border-primary-foreground/60 w-2/5"></div>
            <Link
              to="/register"
              className="text-primary-foreground/50 text-center block text-sm font-semibold underline"
            >
              Register now to start managing your day
            </Link>
          </div>
        </CardWrapper>
      </Container>
    </section>
  )
}
