import AuthImageSlider from '@/components/auth/AuthImageSlider'


const title = "Hesap Oluşturun"
const subtitle = "  KASDER platformuna katılın."

const Register = () => {
  return (
    <div>
      <div className="min-h-screen flex">
      {/* Left side - Image slider (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2">
        <AuthImageSlider />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}


        {/* Form container */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* <SignInForm/> */}
            <div className='w-full bg-rose-700 flex items-center justify-center'>
              FORM HERE
            </div>

          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default Register