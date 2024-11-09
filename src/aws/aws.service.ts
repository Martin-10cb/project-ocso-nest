import { Injectable } from "@nestjs/common";
import * as AWS from "@aws-sdk/client-s3";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class AwsService {
  private s3 = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.acceskey_bucket,
      secretAccessKey: process.env.secretkey_bucket,
    },
  });

  async uploadFile(file: Express.Multer.File) {
    const key = file.originalname;
    const url = `https://nest-ocso-test1.s3.us-east-2.amazonaws.com/${key}`
    const bucket = "nest-ocso-test1";
    const command = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: bucket,
    });
    await this.s3.send(command);
    return url;
  }
}
