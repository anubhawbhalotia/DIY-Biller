#include <X11/Xlib.h>
#include<stdio.h>
#include<unistd.h>
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
using namespace cv;
using namespace std;

Mat original(ROW,COLUMN,CV_8UC3);
Mat blue(ROW,COLUMN,CV_8UC3);
Mat green(ROW,COLUMN,CV_8UC3);
Mat red(ROW,COLUMN,CV_8UC3);
Mat canavas(ROW,COLUMN,CV_8UC1);
vector <Mat> spl;

int i_avg = 0, ic = 0, j_avg = 0, jc = 0;
vector <int>  vx, vy;
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
	i_avg = 0, ic = 1, j_avg = 0, jc = 1;
	for(i=0;i<spl[2].rows;i++)
	{
		unsigned char *r=spl[2].ptr(i);
		unsigned char *g=spl[1].ptr(i);
		unsigned char *b=spl[0].ptr(i);
		unsigned char *p=canavas.ptr(i);
		for(j=0;j<spl[2].cols;j++)
		{
			if(*(r+j)>250 && *(g+j) < *(r+j) && *(b+j) < *(r+j) && 
				*(b+j) < *(g+j) && *(b+j) < 180 && *(g+j) < 180)
			{
				// cout<<j<<" "<<i<<endl;
				*(p+j)=250;
				i_avg += i;
				ic++;
				j_avg += j;
				jc++;
			}
		}
	}
	if(jc >= 2)
		jc--;
	i_avg /= jc;
	j_avg /= jc;
}
// void displayPixels(Mat canavas)
// {

// }
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
void scaleMousePoint()
{
	j_avg = (j_avg*1920)/1280;
	i_avg = (i_avg*1080)/720;
}
void mouseClick(int button)
{
	Display *display = XOpenDisplay(NULL);

	XEvent event;
	
	if(display == NULL)
	{
		fprintf(stderr, "Errore nell'apertura del Display !!!\n");
		exit(EXIT_FAILURE);
	}
	
	memset(&event, 0x00, sizeof(event));
	
	event.type = ButtonPress;
	event.xbutton.button = button;
	event.xbutton.same_screen = True;
	
	XQueryPointer(display, RootWindow(display, DefaultScreen(display)), &event.xbutton.root, &event.xbutton.window, &event.xbutton.x_root, &event.xbutton.y_root, &event.xbutton.x, &event.xbutton.y, &event.xbutton.state);
	
	event.xbutton.subwindow = event.xbutton.window;
	
	while(event.xbutton.subwindow)
	{
		event.xbutton.window = event.xbutton.subwindow;
		
		XQueryPointer(display, event.xbutton.window, &event.xbutton.root, &event.xbutton.subwindow, &event.xbutton.x_root, &event.xbutton.y_root, &event.xbutton.x, &event.xbutton.y, &event.xbutton.state);
	}
	
	if(XSendEvent(display, PointerWindow, True, 0xfff, &event) == 0) fprintf(stderr, "Error\n");
	
	XFlush(display);
	
	usleep(100000);
	
	event.type = ButtonRelease;
	event.xbutton.state = 0x100;
	
	if(XSendEvent(display, PointerWindow, True, 0xfff, &event) == 0) fprintf(stderr, "Error\n");
	
	XFlush(display);
	
	XCloseDisplay(display);
}
void mouseClickPress(int button)
{
	Display *display = XOpenDisplay(NULL);

	XEvent event;
	
	if(display == NULL)
	{
		fprintf(stderr, "Errore nell'apertura del Display !!!\n");
		exit(EXIT_FAILURE);
	}
	
	memset(&event, 0x00, sizeof(event));
	
	event.type = ButtonPress;
	event.xbutton.button = button;
	event.xbutton.same_screen = True;
	
	XQueryPointer(display, RootWindow(display, DefaultScreen(display)), &event.xbutton.root, &event.xbutton.window, &event.xbutton.x_root, &event.xbutton.y_root, &event.xbutton.x, &event.xbutton.y, &event.xbutton.state);
	
	event.xbutton.subwindow = event.xbutton.window;
	
	while(event.xbutton.subwindow)
	{
		event.xbutton.window = event.xbutton.subwindow;
		
		XQueryPointer(display, event.xbutton.window, &event.xbutton.root, &event.xbutton.subwindow, &event.xbutton.x_root, &event.xbutton.y_root, &event.xbutton.x, &event.xbutton.y, &event.xbutton.state);
	}
	
	if(XSendEvent(display, PointerWindow, True, 0xfff, &event) == 0) fprintf(stderr, "Error\n");
	
	XFlush(display);
	
	usleep(100000);
	
	// event.type = ButtonRelease;
	// event.xbutton.state = 0x100;
	
	if(XSendEvent(display, PointerWindow, True, 0xfff, &event) == 0) fprintf(stderr, "Error\n");
	
	XFlush(display);
	
	XCloseDisplay(display);
}
void mouseClickRelease(int button)
{
	Display *display = XOpenDisplay(NULL);

	XEvent event;
	
	if(display == NULL)
	{
		fprintf(stderr, "Errore nell'apertura del Display !!!\n");
		exit(EXIT_FAILURE);
	}
	
	memset(&event, 0x00, sizeof(event));
	
	event.type = ButtonRelease;
	event.xbutton.button = button;
	event.xbutton.same_screen = True;
	
	XQueryPointer(display, RootWindow(display, DefaultScreen(display)), &event.xbutton.root, &event.xbutton.window, &event.xbutton.x_root, &event.xbutton.y_root, &event.xbutton.x, &event.xbutton.y, &event.xbutton.state);
	
	event.xbutton.subwindow = event.xbutton.window;
	
	while(event.xbutton.subwindow)
	{
		event.xbutton.window = event.xbutton.subwindow;
		
		XQueryPointer(display, event.xbutton.window, &event.xbutton.root, &event.xbutton.subwindow, &event.xbutton.x_root, &event.xbutton.y_root, &event.xbutton.x, &event.xbutton.y, &event.xbutton.state);
	}
	
	if(XSendEvent(display, PointerWindow, True, 0xfff, &event) == 0) fprintf(stderr, "Error\n");
	
	XFlush(display);
	
	usleep(100000);
	
	// event.type = ButtonRelease;
	// event.xbutton.state = 0x100;
	
	if(XSendEvent(display, PointerWindow, True, 0xfff, &event) == 0) fprintf(stderr, "Error\n");
	
	XFlush(display);
	
	XCloseDisplay(display);
}
void markStateChange(int &counter, int mx, int my)
{
	counter++;
	if(mx == 0 && my == 0)
	{

	}
	else
	{
		vx.push_back(mx);
		vy.push_back(my);
	}
}
int main()
{
	int mx = 1920/2, my=1080/2;
	int mx_prev = mx, my_prev = my;
	if(cap.isOpened()==false)
	{
		cout<<"Cannot open the video file"<<endl;
		cin.get();
		return -1;
	}
	namedWindow("red",WINDOW_NORMAL);
	namedWindow("canavas",WINDOW_NORMAL);
	initializeMatObject(canavas);

	Display *display = XOpenDisplay(0);
 	Window root = DefaultRootWindow(display);
 	int mode = 0, counter = 0, x = 0;
 	int on = 0, off = 0, d = 0;
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
		scaleMousePoint();
		mx = j_avg;
		my = i_avg;
		// lights off
		if((mx == 0 && my == 0)) 
		{
			// switched on -> off
			if(on)
			{
				// cout<<"on = "<<on<<endl;
				if(on > 4)
				{
					d = 0;
				}
				else
				{
					d++;
					off++;
					on = 0;
					// on_time += on;	
					continue;
				}
			}
			off++;
			on = 0;
		}
		// lights on
		else 
		{
			// switched off -> on
			if(off)
			{
				// cout<<"off = "<<off<<endl;
				if(off > 4)
				{
					d = 0;
				}
				else
				{
					d++;
					on++;
					off = 0;
					// off_time += off;
					vx.push_back(mx);
					vy.push_back(my);
					mx_prev = mx;
					my_prev = my;
					XWarpPointer(display, None, root, 0, 0, 0, 0, mx, my);
					continue;
				}
			}
			on++;
			off = 0;
			if((mx == mx_prev && my == my_prev) || 
				(abs(mx - mx_prev) + abs(my - my_prev) < 10))
			{
				
			}
			else
			{
				XWarpPointer(display, None, root, 0, 0, 0, 0, mx, my);
				mx_prev = mx;
				my_prev = my;
			}
		}
		// if(mx == 0 && my == 0)
		// {
		// 	if(mode == 1)
		// 	{
		// 		counter++;
		// 	}
		// 	mode = 0;
		// }
		// else
		// {
		// 	if(mode == 0)
		// 	{
		// 		markStateChange(counter, mx, my);
		// 	}
		// 	mode = 1;
		// }

		// if(counter >= 4)
		// if(d > 2 && d < 5) //single click
		// {
		// 	double x_sum = 0, y_sum = 0;
		// 	double x_diff = 0, y_diff = 0;
		// 	for(int i = 0; i < vx.size(); i++)
		// 	{
		// 		x_sum += vx[i];
		// 		y_sum += vy[i];
		// 	}
		// 	x_sum /= (double)vx.size();
		// 	y_sum /= (double)vy.size();
		// 	for(int i = 0; i < vx.size(); i++)
		// 	{
		// 		x_diff += (x_sum - vx[i]);
		// 		y_diff += (y_sum - vy[i]);
		// 	}
		// 	int c = 0;
		// 	if(abs(x_diff + y_diff) < 2)
		// 	{
		// 		for(int i = vx.size() - 1; i >= 0; i--)
		// 		{
		// 			if(vx[i] !=0 || vy[i] != 0)
		// 			{
		// 				mx = vx[i];
		// 				my = vy[i];
		// 				break;
		// 			}
		// 		}
		// 		if(counter > 5)
		// 		{
		// 			if(x % 2 == 0)			
		// 			{
		// 				x++;
		// 				mouseClickPress(Button1);
		// 				cout<<"press"<<endl;
		// 			}
		// 			else
		// 			{
		// 				x++;
		// 				mouseClickRelease(Button1);
		// 				cout<<"release"<<endl;
		// 			}
		// 		}
		// 		else
		// 		{
		// 			mouseClickPress(Button1);
		// 			mouseClickRelease(Button1);
		// 		}
		// 		XWarpPointer(display, None, root, 0, 0, 0, 0, mx, my);
		// 	}
		// 	vx.clear();
		// 	vy.clear();
		// 	counter = 0;
		// }
		// if(d)
		// 	cout<<"d = "<<d<<endl;
		if(on > 4 || off > 4)
		{
			if(d >= 3 && d <= 4)
			{
				if(x % 2 == 1)
				{
					mouseClickRelease(Button1);
					x++;
				}
				else
				{
					mouseClick(Button1);
				}
			}
			else if(d >= 5 && d <= 9)
			{
				if(x % 2 == 0)
				{
					mouseClickPress(Button1);
					// cout<<x<<" "<<"press"<<endl;
				}
				else
				{
					mouseClickRelease(Button1);
					// cout<<x<<" "<<"Release"<<endl;
				}
				x++;
			}
			d = 0;
		}
		// if(d > 7)
		// {
		// 	d = 0;
		// }
		XFlush(display);
		// usleep(50);
		// imshow("blue",spl[0]);
		// imshow("green", spl[1]);
		imshow("red",spl[2]);
		imshow("canavas",canavas);
		int keyPress=waitKey(10);
		// if(keyPress==27)//Esc key
		// {
		// 	initializeMatObject(canavas);
		// }
	}
	XCloseDisplay(display);
}