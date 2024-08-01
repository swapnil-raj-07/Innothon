namespace CyberEscape
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.notifyIcon2 = new System.Windows.Forms.NotifyIcon(this.components);
            this.SuspendLayout();
            // 
            // notifyIcon2
            // 
            this.notifyIcon2.Icon = ((System.Drawing.Icon)(resources.GetObject("notifyIcon2.Icon")));
            // 
            // MainForm
            // 
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "MainForm";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.Resize += new System.EventHandler(this.MainForm_Resize);
            this.ResumeLayout(false);

        }
    //private void InitializeComponent()
    //{
    //    this.components = new System.ComponentModel.Container();
    //    System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
    //    this.notifyIcon1 = new System.Windows.Forms.NotifyIcon(this.components);
    //    this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
    //    this.openToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
    //    this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
    //    this.contextMenuStrip1.SuspendLayout();
    //    this.SuspendLayout();
    //    // 
    //    // notifyIcon1
    //    // 
    //    this.notifyIcon1.ContextMenuStrip = this.contextMenuStrip1;
    //    this.notifyIcon1.Icon = ((System.Drawing.Icon)(resources.GetObject("notifyIcon1.Icon")));
    //    this.notifyIcon1.Text = "Cyber Safe";
    //    this.notifyIcon1.Visible = true;
    //    this.notifyIcon1.MouseClick += new System.Windows.Forms.MouseEventHandler(this.NotifyIcon1_MouseClick);
    //    // 
    //    // contextMenuStrip1
    //    // 
    //    this.contextMenuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
    //    this.contextMenuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
    //    this.openToolStripMenuItem,
    //    this.exitToolStripMenuItem});
    //    this.contextMenuStrip1.Name = "contextMenuStrip1";
    //    this.contextMenuStrip1.Size = new System.Drawing.Size(211, 80);
    //    // 
    //    // openToolStripMenuItem
    //    // 
    //    this.openToolStripMenuItem.Name = "openToolStripMenuItem";
    //    this.openToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
    //    this.openToolStripMenuItem.Text = "Open";
    //    this.openToolStripMenuItem.Click += new System.EventHandler(this.OpenMenuItem_Click);
    //    // 
    //    // exitToolStripMenuItem
    //    // 
    //    this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
    //    this.exitToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
    //    this.exitToolStripMenuItem.Text = "Exit";
    //    this.exitToolStripMenuItem.Click += new System.EventHandler(this.exitToolStripMenuItem_Click);
    //    // 
    //    // Form1
    //    // 
    //    this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
    //    this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
    //    this.ClientSize = new System.Drawing.Size(800, 450);
    //    this.Name = "Form1";
    //    this.Text = "Form1";
    //    this.Load += new System.EventHandler(this.Form1_Load);
    //    this.contextMenuStrip1.ResumeLayout(false);
    //    this.ResumeLayout(false);

    //}

    #endregion

    private System.Windows.Forms.NotifyIcon notifyIcon1;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.ToolStripMenuItem openToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
    }
}

