import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email'
import emailTailwindConfig from './tailwind.config'

interface AuthOtpEmailProps {
  expiresInMinutes: number
  otp: string
  purpose: string
}

export function AuthOtpEmail({
  expiresInMinutes,
  otp,
  purpose,
}: AuthOtpEmailProps) {
  return (
    <Html dir="ltr" lang="en">
      <Tailwind config={emailTailwindConfig}>
        <Head />
        <Body
          className="m-0 bg-background px-0 py-10 font-sans text-foreground"
          dir="ltr"
          lang="en"
        >
          <Preview>
            {`Your evex-new code expires in ${expiresInMinutes} minutes.`}
          </Preview>
          <Container
            className="mx-auto w-full max-w-[600px] px-5"
            dir="ltr"
            lang="en"
          >
            <Section className="mb-6">
              <Row>
                <Column className="w-10 align-middle">
                  <BrandPixelMark />
                </Column>
                <Column className="align-middle">
                  <Text className="m-0 font-mono font-semibold text-[18px] text-foreground leading-none">
                    evex-new
                  </Text>
                  <Text className="m-0 mt-1 font-medium font-mono text-[11px] text-mutedForeground uppercase leading-none">
                    Agent registry
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className="rounded-[6px] border border-border border-solid bg-card p-7 shadow-sm">
              <Text className="m-0 mb-4 font-medium font-mono text-[12px] text-brand uppercase leading-4">
                One-time code
              </Text>
              <Heading
                as="h1"
                className="m-0 font-sans font-semibold text-[24px] text-foreground leading-8"
              >
                Sign in to evex-new
              </Heading>
              <Text className="m-0 mt-3 text-[16px] text-mutedForeground leading-6">
                Use this code to {purpose}. It expires in {expiresInMinutes}{' '}
                minutes.
              </Text>

              <Section className="my-7 rounded-[6px] border border-border border-solid bg-muted px-5 py-4 text-center">
                <Text className="m-0 font-bold font-mono text-[32px] text-foreground leading-10 tracking-normal">
                  {otp}
                </Text>
              </Section>

              <Text className="m-0 text-[14px] text-mutedForeground leading-6">
                If you did not request this code, you can ignore this email.
              </Text>
            </Section>

            <Text className="m-0 mt-5 text-center font-mono text-[12px] text-mutedForeground leading-5">
              evex-new · Browse, publish, and install AI agents
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

function BrandPixelMark() {
  return (
    <Section className="m-0 w-8 rounded-[6px] bg-primary p-1">
      <Row>
        <MarkCell tone="brand" />
        <MarkCell tone="light" />
        <MarkCell tone="brand" />
      </Row>
      <Row>
        <MarkCell tone="light" />
        <MarkCell tone="brand" />
        <MarkCell tone="dark" />
      </Row>
      <Row>
        <MarkCell tone="brand" />
        <MarkCell tone="light" />
        <MarkCell tone="brand" />
      </Row>
    </Section>
  )
}

function MarkCell({ tone }: { tone: 'brand' | 'dark' | 'light' }) {
  const className = {
    brand: 'bg-brand',
    dark: 'bg-primary',
    light: 'bg-primaryForeground',
  }[tone]

  return <Column className={`h-2 w-2 rounded-[2px] ${className}`} />
}

AuthOtpEmail.PreviewProps = {
  expiresInMinutes: 5,
  otp: '123456',
  purpose: 'sign in',
} satisfies AuthOtpEmailProps

export default AuthOtpEmail
