import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, prediction, userId } = body;
  
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
      userId: Number(userId),
    },
  });

  if(insert) {
    return NextResponse.json({
        status: 'success',
        data: {
          prediction: insert.prediction,
          id: insert.id
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

export async function GET(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  const healthMetric = await prisma.healthMetric.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
    },
  });

  if(healthMetric) {
    return NextResponse.json({
      status: 'success',
      data: {
        healthMetric: healthMetric,
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