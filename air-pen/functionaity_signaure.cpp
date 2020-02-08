#include <X11/Xlib.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <unistd.h>
#include <X11/Xutil.h>
#include <opencv2/highgui.hpp>
#include <bits/stdc++.h>
#include <opencv2/imgproc.hpp>
#include <fstream>
#define ROW 720
#define COLUMN 1280
#define scaleX 600
#define scaleY 200
using namespace cv;
using namespace std;
int scalingFactor=1;
int boundary[4];
String path="signatures/";
Mat original(ROW,COLUMN,CV_8UC3);
Mat blue(ROW,COLUMN,CV_8UC3);
Mat green(ROW,COLUMN,CV_8UC3);
Mat red(ROW,COLUMN,CV_8UC3);
Mat canavas(ROW,COLUMN,CV_8UC1);
Mat resolved(ROW/scalingFactor,COLUMN/scalingFactor,CV_8UC1);
Mat scaled(scaleY,scaleX,CV_8UC1);
vector <Mat> spl;
VideoCapture cap("v4l2:///dev/video0");
void invertImage(Mat original)
{
	//cout<<"invertImage()"<<endl;
	int i,j,temp;
	for(i=0;i<original.rows;i++)
	{
		unsigned char *p=original.ptr(i);
		for(j=0;j<original.cols/2;j++)
		{
			temp=*(p+(3*j));
			*(p+(3*j))=*(p+(3*(original.cols-j-1)));
			*(p+(3*(original.cols-j-1)))=temp;
			temp=*(p+(3*j)+1);
			*(p+(3*j)+1)=*(p+(3*(original.cols-j-1))+1);
			*(p+(3*(original.cols-j-1))+1)=temp;
			temp=*(p+(3*j)+2);
			*(p+(3*j)+2)=*(p+(3*(original.cols-j-1))+2);
			*(p+(3*(original.cols-j-1))+2)=temp;
		}
	}
}
void thresholding(Mat canavas)
{
	int i,j; 
	for(i=0;i<spl[2].rows;i++)
	{
		unsigned char *r=spl[2].ptr(i);
		unsigned char *g=spl[1].ptr(i);
		unsigned char *b=spl[0].ptr(i);
		unsigned char *p=canavas.ptr(i);
		for(j=0;j<spl[2].cols;j++)
		{
			if(*(r+j)>250 && *(g+j) < *(r+j) && *(b+j) < *(r+j) && 
				*(b+j) < *(g+j) && *(b+j) < 190)
			{
				*(p+j)=250;
			}
		}
	}
}
void initializeMatObject(Mat obj)
{
	//cout<<"initializeMatObject()"<<endl;
	int i,j;
	for(i=0;i<obj.rows;i++)
	{
		unsigned char *p=obj.ptr(i);
		for(j=0;j<obj.cols;j++)
		{
			*(p+j)=0;
		}
	}
}
void setResolution(Mat canavas,Mat resolved)//decrease the size of image by scaling factor
{
	imshow("canavas_functioncall",canavas);
	cout<<"setResolution()"<<endl;
	int row=0,col,i,j,k,l,s;
	for(i = 0; i < ROW; i += scalingFactor)
	{
		col=0;
		unsigned char *q = resolved.ptr(row);
		for(j = 0; j < COLUMN; j += scalingFactor)
		{
			s=0;
			for(k = i; k < i + scalingFactor; k++)
			{
				unsigned char *p=canavas.ptr(k);
				for(l = j; l < j + scalingFactor ; l++)
				{
					s += (*(p+l)/250);
				}
			}
			if(s>=(scalingFactor))
			{
				*(q+col)=250;
			}
			col++;
		}
		row++;	
	}
}
void findBoundary(Mat resolved)//find the boundar of image
{
	cout<<"findBoundary()"<<endl;
	int i,j;
	boundary[0]=2000;
	boundary[1]=-1;
	boundary[2]=2000;
	boundary[3]=-1;
	for(i=0;i<resolved.rows;i++)
	{
		unsigned char *p=resolved.ptr(i);
		for(j=0;j<resolved.cols;j++)
		{
			if(*(p+j)==250)
			{
				if(j<boundary[0])
				{
					boundary[0]=j;
				}
				if(j>boundary[1])
				{
					boundary[1]=j;
				}
				if(i<boundary[2])
				{
					boundary[2]=i;
				}
				if(i>boundary[3])
				{
					boundary[3]=i;
				}
			}
		}
	}
	for(i=0;i<4;i++)
	{
		cout<<boundary[i]<<" ";
	}
	cout<<endl;
}
void scaling(Mat resolved,Mat scaled)//convert the image to scaleX*scaleY
{
	cout<<"scaling()"<<endl;
	int a[resolved.rows][scaleX],b[scaleY][scaleX],col,row,s;
	for(int i=0;i<scaleY;i++)
	{
		for(int j=0;j<scaleX;j++)
		{
			b[i][j]=0;
		}
	}
	for(int i=0;i<resolved.rows;i++)
	{
		for(int j=0;j<scaleX;j++)
		{
			a[i][j]=0;
		}
	}
	if(boundary[1]-boundary[0]>scaleX)
	{
		float localScalingFactor=(boundary[1]-boundary[0]+1)/(float)scaleX;
		for(int i=0;i<resolved.rows;i++)
		{
			col=0;
			unsigned char *p=resolved.ptr(i);
			for(float j=boundary[0];j<boundary[1];j+=localScalingFactor)
			{
				s=0;
				for(int k=j;k<(int)(j+localScalingFactor);k++)
				{
					s+=(*(p+k)/250);
				}

				if(s>(localScalingFactor/2))
				{
					a[i][col]=250;
				}
				else
				{
					a[i][col]=0;
				}
				col++;
			}
		}	
	}
	else
	{
		for(int i=0;i<resolved.rows;i++)
		{
			int col=(scaleX-(boundary[1]-boundary[0]))/2;
			unsigned char *p=resolved.ptr(i);
			for(int j=boundary[0];j<boundary[1];j++)
			{
				//cout<<"j="<<j<<endl;
				if(*(p+j)==250)
				{
					a[i][col]=250;
				}
				else
				{
					a[i][col]=0;
				}
				col++;
			}
		}
	}
	if(boundary[3]-boundary[2]>scaleY)
	{
		float localScalingFactor=(boundary[3]-boundary[2]+1)/(float)scaleY;
		for(int i=0;i<scaleX;i++)
		{
			row=0;
			for(float j=boundary[2];j<boundary[3];j+=localScalingFactor)
			{	s=0;
				for(int k=j;k<j+localScalingFactor;k++)
				{
					s+=(a[k][i]/250);
				}
				if(s>(localScalingFactor/2))
				{
					b[row][i]=250;
				}
				else
				{
					b[row][i]=0;
				}
				row++;
			}

		}
	}
	else
	{
		
		for(int i=0;i<scaleX;i++)
		{
			int row=(scaleY-(boundary[3]-boundary[2]))/2;
			//cout<<"row="<<row<<endl;
			for(int j=boundary[2];j<boundary[3];j++)
			{
				if(a[j][i]==250)
				{
					b[row][i]=250;
				}
				else
				{
					b[row][i]=0;
				}
				row++;
			}
		}
	}
	for(int i=0;i<scaleY;i++)
	{
		unsigned char *p=scaled.ptr(i);
		for(int j=0;j<scaleX;j++)
		{
			*(p+j)=(int)b[i][j];
		}
	}
	for(int i = 0; i < scaleY; i++)
	{
		unsigned char *p=scaled.ptr(i);	
		for(int j = 0; j < scaleX; j++)
		{
			if(*(p + j)  == 250)
			{
				*(p + j) = 0;
			}
			else
			{
				*(p + j) = 250;
			}
		}
	}
	return;
}
int writeImage(string fileName)
{
	initializeMatObject(resolved);
	setResolution(canavas, resolved);
	namedWindow("resolved", WINDOW_NORMAL);
	imshow("resolved", resolved);
	findBoundary(resolved);
	scaling(resolved, scaled);
	namedWindow("scaled", WINDOW_NORMAL);
	imshow("scaled",scaled);
	bool isSuccess = imwrite(path+fileName+".jpg",scaled);
	if(isSuccess == false)
	{
		cout<<"Failed to save the image"<<endl;
		return -1;
	}
	return 1;
}

int main()
{
	if(cap.isOpened()==false)
	{
		cout<<"Cannot open the video file"<<endl;
		cin.get();
		return -1;
	}	
	namedWindow("red",WINDOW_NORMAL);
	namedWindow("canavas",WINDOW_NORMAL);
	initializeMatObject(canavas);
	while(1)
	{
		bool bSuccess=cap.read(original);
		if(bSuccess==false)
		{
			break;
		}
		invertImage(original);
		split(original, spl);
		thresholding(canavas);
		imshow("red",spl[2]);
		imshow("canavas",canavas);
		int keyPress=waitKey(10);
		if(keyPress==27)//Esc key
		{
			initializeMatObject(canavas);
		}
		if(keyPress==13)//Enter key
		{
			writeImage("sign");
		}	
	}
}
