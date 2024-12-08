import { NextRequest, NextResponse } from 'next/server';
import { prisma

 } from '@/lib/prisma';
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction } = body;
  
  const insert = await prisma.healthMetric.create({
    data: {
      age: Number(age),
      sex: Number(sex),
      cp: Number(cp),
      trestbps: Number(trestbps),
      chol: Number(chol),
      fbs: Number(fbs),
      restecg: Number(restecg),
      thalach: Number(thalach),
      exang: Number(exang),
      oldpeak: Number(oldpeak),
      slope: Number(slope),
      ca: Number(ca),
      thal: Number(thal),
      prediction: Number(prediction),
      userId: 1,
    },
  });

  if(insert) {
    return NextResponse.json({
        status: 'success',
        data: {
          prediction: Math.round(Math.random() * 100),
        },
      });
  } else {
    return NextResponse.json({
      status: 'error',
      data: {
        error: 'Something went wrong',
      },
    });
  }
}