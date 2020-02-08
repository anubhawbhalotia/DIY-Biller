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
Mat final(ROW,COLUMN,CV_8UC1);
Mat canavas(ROW,COLUMN,CV_8UC1);
Mat resolved(ROW/scalingFactor,COLUMN/scalingFactor,CV_8UC1);
Mat scaled(scaleY,scaleX,CV_8UC1);
Mat bg_feedback;
vector <Mat> spl, spl_bg;
VideoCapture cap("v4l2:///dev/video0");
int left_count, right_count;
ofstream feedback; // -1 for happy, 1 for sad
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
				*(b+j) < *(g+j) && *(b+j) < 180)
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

void copyCanavasToBg()
{
	for(int i = 0; i < ROW; i++)
	{
		unsigned char *p=canavas.ptr(i);
		unsigned char *q=final.ptr(i);
		for(int j= 0; j < COLUMN; j++)
		{
			if(*(p + j) == 250)
			{
				if(*(q + j) == 250)
				{
					*(q + j) = 0;
				}
				else
				{
					*(q + j) = 250;
				}
				if(j < 640)
				{
					left_count++;
				}
				else
				{
					right_count++;
				}
			}
		}

	}
}
int checkResult()
{
	if(abs(left_count - right_count) < 30000)
		return 0;
	if(left_count > right_count)
		return -1;
	return 1;
}
int main()
{
	left_count = 0;
	right_count = 0;
	feedback.open("feedback.txt");
	if(cap.isOpened()==false)
	{
		cout<<"Cannot open the video file"<<endl;
		cin.get();
		return -1;
	}	
	namedWindow("red",WINDOW_NORMAL);
	namedWindow("canavas",WINDOW_NORMAL);
	bg_feedback = imread("bg_feedback.jpg");
	split(bg_feedback, spl_bg);
	initializeMatObject(canavas);
	initializeMatObject(final);
	for(int i = 0; i < ROW; i++)
	{
		unsigned char *p=spl_bg[2].ptr(i);
		unsigned char *q=final.ptr(i);
		for(int j= 0; j < COLUMN; j++)
		{
			if(*(p + j) >= 200)
			{
				*(q  + j) = 250;
			}
		}
	}
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
		imshow("final", final);
		copyCanavasToBg();
		cout<<"l = "<<left_count<<" r = "<<right_count<<endl;
		initializeMatObject(canavas);
		int ans = checkResult();
		if(ans != 0)
		{
			cout<<ans<<endl;
			feedback<<ans<<endl;
			return 0;
		}
		int keyPress=waitKey(10);
		if(keyPress==27)//Esc key
		{
			initializeMatObject(canavas);
		}	
	}
}
