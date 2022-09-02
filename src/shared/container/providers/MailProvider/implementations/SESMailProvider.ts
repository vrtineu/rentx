import AWS from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SESMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION_SES,
      }),
    });
  }

  public async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const tempalteParse = handlebars.compile(templateFileContent);

    const templateHTML = tempalteParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <vinicius@tineu.dev>',
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
